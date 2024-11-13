import React, { useMemo } from "react";
import { useBackendLanguageCode, useTranslation } from "utility/language";
import { history } from "../../../../history";
import { mapTranslatedProperties } from "helpers/language";
import { ToggleStatus } from "components/ToggleStatus";
import HovarableImage from "components/HovarableImage";
import { baseURL } from "api/config";
import { AiFillStar } from "react-icons/ai";
import { GrView } from "react-icons/gr";
import useProductType, { TYPE } from "./useProductType";

const navigateToDetails = (product, productType) => {
  if (productType === TYPE.OWNER_PRODUCT) {
    history.push(`/owner-products/view-one/${product.id}`);
  }
  if (productType === TYPE.SHOP_PRODUCT) {
    history.push(
      `/shops-products/view-one/${product.id}/shop/${product.shop_id}`
    );
  }
};

const useTableColumns = ({ toggleMutation, additionalColumns = [] }) => {
  const t = useTranslation();
  const languageCode = useBackendLanguageCode();
  const productType = useProductType();

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
        selector: "product_sort",
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
            id={`product_main_image_${row.id}`}
            src={`${baseURL}${row.product_main_image}`}
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
            row.product_details,
            "product_name",
            languageCode
          ),
      },
      {
        name: t("price"),
        selector: "product_price",
        sortable: true,
        center: true,
      },
      {
        name: t("quantity"),
        selector: "product_quantity",
        sortable: true,
        center: true,
      },
      ...additionalColumns,
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
            onClick={() => navigateToDetails(row, productType)}
            size={22}
            style={{ cursor: "pointer" }}
          />
        ),
      },
    ],
    [t, languageCode, productType, additionalColumns, toggleMutation]
  );
};

export default useTableColumns;
