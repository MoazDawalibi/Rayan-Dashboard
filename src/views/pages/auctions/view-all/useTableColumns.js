import React, { useMemo } from "react";
import { useBackendLanguageCode, useTranslation } from "utility/language";
import { history } from "../../../../history";
import { mapTranslatedProperties } from "helpers/language";
import { ToggleStatus } from "components/ToggleStatus";
import HovarableImage from "components/HovarableImage";
import { baseURL } from "api/config";
import { AiFillStar } from "react-icons/ai";
import {useUpdateAuctionStatus} from 'api/auctions'
import { GrView } from "react-icons/gr";
import AuctionStatus from "components/AuctionStatus";



const useTableColumns = () => {
  const t = useTranslation();
  const languageCode = useBackendLanguageCode();
  const toggleMutation=useUpdateAuctionStatus();
  return useMemo(
    () => [
      {
        name: "",
        selector: "is_highlight",
        sortable: false,
        center: true,
        cell: (row) => (
          <>
            {row.is_highlight ? (
              <AiFillStar style={{ color: "#FFC085" }} size={18} />
            ) : null}
          </>
        ),
        width: "50px",
      },
      {
        name: t("sort"),
        selector: "auction_sort",
        sortable: true,
        center: true,
        width: "50px",
      },
      {
        name: t("image"),
        sortable: false,
        center: true,
        cell: (row) => (
          <HovarableImage
            id={`auction_main_image_${row.id}`}
            src={`${baseURL}${row.auction_main_image}`}
            width="35"
          />
        ),
      },
      {
        name: t("name"),
        sortable: false,
        center: true,
        cell: (row) =>
          mapTranslatedProperties(
            row.auction_details,
            "auction_name",
            languageCode
          ),
      },
      {
        name: t("start_at"),
        sortable: false,
        center: true,
        cell:(row)=><>{row.start_at}</>

      },
      {
        name: t("end_at"),
        sortable: false,
        center: true,
        cell:(row)=><>{row.end_at}</>

      },

      {
        name: t("starting_price"),
        sortable: false,
        center: true,
        selector:"auction_starting_price",
      },
      {
        name: t("auction_status"),
        sortable: false,
        center: true,
        cell: (row) => <AuctionStatus auction_status={row.auction_status} />
      },
   
      {
        name: t("status"),
        sortable: false,
        center: true,
        cell: (row) => (
          <ToggleStatus object={row} toggleMutation={toggleMutation} />
        ),
      },
      {
        name: "",
        selector: "action",
        sortable: false,
        center: true,
        cell: (row) => (
          <GrView
            onClick={()=>history.push(`/auction/view-one/${row.id}`)}
            size={22}
            style={{ cursor: "pointer" }}
          />
        ),
      },
    ],
    [t, languageCode, toggleMutation]
  );
};

export default useTableColumns;
