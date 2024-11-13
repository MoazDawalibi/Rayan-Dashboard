import React, { useMemo } from "react";
import { useTranslation } from "utility/language";
import Actions from "components/table/TableActions";
// import { history } from "../../../history";
import { useDeleteSetting } from "api/app_setting";
import { ToggleStatus } from "components/ToggleStatus";
import {  useDeleteRole} from "api/role";
import HovarableImage from "components/HovarableImage";
import { baseURL } from "api/config";

const useTableColumns = () => {
  const t = useTranslation();
  const deleteMutation = useDeleteRole();


  return useMemo(
   
    () => [
      {
        name: `${t("role")}`,
        sortable: false,
        center: true,
        selector:"name" 
      },
      {
        name: t("number_permissions"),
        selector:"permission_count",
        center: true,
      },
       
      {
        name: "#",
        sortable: false,
        center: true,
        cell: (row) => (
          <Actions
                showDelete={true}
                onDelete={() => deleteMutation.mutate({id:row.id })}  
                showEdit={false}
            />
        )
      }
    ],
    [t, deleteMutation]
  );
};

export default useTableColumns;
