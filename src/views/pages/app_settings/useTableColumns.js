import React, { useMemo } from "react";
import { useTranslation } from "utility/language";
import Actions from "components/table/TableActions";
// import { history } from "../../../history";
import { mapTranslatedProperties } from "helpers/language";
import { useDeleteSetting } from "api/app_setting";

const useTableColumns = (setEditModal, setObjectToEdit) => {
  const t = useTranslation();
  const deleteMutation = useDeleteSetting();
 

  return useMemo(
   
    () => [
      {
        name:t("name"),
        sortable: false,
        center: true,
        cell:(row)=>t(row.title)
      },
      {
        name: t("value"),
        selector: "value",
        sortable: true,
        center: true,
      },
      {
        name: "#",
        sortable: false,
        center: true,
        cell: (row) => (
          <Actions
          
            onEdit={() => {
              setEditModal(true);
              setObjectToEdit(row);
            }}
            onDelete={() => deleteMutation.mutate({ id: row.id })}
          />
        ),
      },
    ],
    [t, deleteMutation, setEditModal, setObjectToEdit]
  );
};

export default useTableColumns;
