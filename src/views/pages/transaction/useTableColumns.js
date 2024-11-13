import React, { useMemo } from "react";
import { useTranslation } from "utility/language";
import Actions from "components/table/TableActions";
// import { history } from "../../../history";
import { useDeleteSetting } from "api/app_setting";
import { ToggleStatus } from "components/ToggleStatus";
import { useUpdateCategoryStatus } from "api/categories";

const useTableColumns = ({setEditModal, setObjectToEdit}) => {
  const t = useTranslation();
  const deleteMutation = useDeleteSetting();
  const toggleMutation = useUpdateCategoryStatus();

  return useMemo(
   
    () => [
      {
        name: t("person_from"),
      
        sortable: true,
        center: true,
        cell:(row)=>(
          <p>{row.from} ({row.transaction_from_type})</p>
        )
      },
      {
        name: t("person_to"),
        sortable: false,
        center: true,
        cell:(row)=>(
          <p>{row.to} ({row.transaction_to_type})</p>
        )
      },
      {
        name: `${t("value")}`,
        sortable: false,
        center: true,
        selector:"value" 
      },
   
      {
        name: t("trans_date"),
        selector: "created_at",
        sortable: false,
        center: true,
      },
      // {
      //   name: "#",
      //   sortable: false,
      //   center: true,
      //   cell: (row) => (
      //     <Actions
      //       onEdit={() => {
      //         setEditModal(true);
      //         setObjectToEdit(row);
      //       }}
      //       onDelete={() => deleteMutation.mutate({ id: row.id })}
      //     />
      //   ),
      // },
    ],
    [t, deleteMutation, setEditModal, setObjectToEdit , toggleMutation]
  );
};

export default useTableColumns;
