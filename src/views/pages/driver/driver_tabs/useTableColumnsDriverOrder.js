import React, { useMemo } from "react";
import {
  useDeleteSubCategory,
  useUpdateSubCategoryStatus,
} from "api/subcategories";
import { useBackendLanguageCode, useTranslation } from "utility/language";
import Actions from "components/table/TableActions";
import { history } from "../../../../history";
import { ToggleStatus } from "components/ToggleStatus";
import { GrView } from "react-icons/gr";

const useTableColumnsDriverOrder = (categories, setEditModal, setObjectToEdit) => {
  const t = useTranslation();
  const deleteMutation = useDeleteSubCategory();
  const toggleMutation = useUpdateSubCategoryStatus();
  const languageCode = useBackendLanguageCode();

  return useMemo(
    () => [
      {
        name: t("customer_name"),
        sortable: false,
        center:true,
        selector:"customer_name"
      },
      {
        name: t("driver_name"),
        sortable: false,
        center: true,
        selector:"driver_name"
      },
      
      {
        name: t("address_from"),
        selector: "address_from",
        sortable: false,
        center: true,
      },
      {
        name: t("address_to"),
        selector: "address_to",
        sortable: false,
        center: true,
      },
      {
        name: t("paid_type"),
        selector: "payment_method",
        sortable: true,
        center: true,
      },
      {
        name: t("status"),
        selector: "",
        center: true,
        selector:"status"
      },
      {
        name: t("price"),
        selector: "real_cost",
        sortable: true,
        center: true,
      },
      {
        name: "#",
        sortable: false,
        center: true,
        cell: (row) => (
          <GrView
          onClick={()=>history.push(`/order/${row.id}`)}
          size={22}
          style={{ cursor: "pointer" }}
        />
        ),
      },
    ],
    [
      t,
      categories,
      deleteMutation,
      toggleMutation,
      setEditModal,
      setObjectToEdit,
      languageCode,
    ]
  );
};

export default useTableColumnsDriverOrder;
