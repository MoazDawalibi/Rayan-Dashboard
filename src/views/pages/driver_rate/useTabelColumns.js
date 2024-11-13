import React, { useMemo } from "react";
import { useTranslation } from "utility/language";
import Actions from "components/table/TableActions";
import { history } from "../../../history";
import { useDeleteSetting } from "api/app_setting";
import { ToggleStatus } from "components/ToggleStatus";
import { useUpdateCategoryStatus } from "api/categories";
import { GrView } from "react-icons/gr";
import { Rating } from "react-simple-star-rating";

const useTableColumns = ({setEditModal, setObjectToEdit}) => {
  const t = useTranslation();
  const deleteMutation = useDeleteSetting();
  const toggleMutation = useUpdateCategoryStatus();

  return useMemo(
   
    () => [
      {
        name: `${t("rate")}`,
        sortable: false,
        center: true,
        cell:(row)=>{
          return (
            <Rating initialValue={row.value}  size={23}readonly={true}/>
          )
        }
      },
      {
        name: t("driver"),
        selector: "driver",
        sortable: true,
        center: true,
      },
      {
        name: t("order_code"),
        selector: "order_code",
        sortable: false,
        center: true,
      },
      {
        name: t("reason"),
        selector: "reason",
        sortable: false,
        center: true,
      },
      {
        name: "#",
        sortable: false,
        center: true,
        cell: (row) => (
          <GrView
          onClick={()=>{
           history.push(`/order/${row.order_id}`)
          }}
          size={22}
          style={{ cursor: "pointer" }}
        />
        ),
      },
    ],
    [t, deleteMutation, setEditModal, setObjectToEdit , toggleMutation]
  );
};

export default useTableColumns;
