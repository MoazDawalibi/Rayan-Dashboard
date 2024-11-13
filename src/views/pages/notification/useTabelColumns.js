import React, { useMemo } from "react";
import { useTranslation } from "utility/language";
import Actions from "components/table/TableActions";
// import { history } from "../../../history";
import { useDeleteSetting } from "api/app_setting";
import { ToggleStatus } from "components/ToggleStatus";
import { useUpdateCategoryStatus } from "api/categories";
import HovarableImage from "components/HovarableImage";
import { baseURL } from "api/config";

const useTableColumns = ({setEditModal, setObjectToEdit}) => {
  const t = useTranslation();
  const deleteMutation = useDeleteSetting();
  const toggleMutation = useUpdateCategoryStatus();

  return useMemo(
   
    () => [
      {
        name: `${t("title")}`,
        sortable: false,
        center: true,
        selector:"title" 
      },
      {
        name: t("content"),
        selector:"content",
    
        center: true,
      },
      {
        name: t("image"),
       
        sortable: false,
        center: true,
        cell:(row)=>{
         
          return (
            <HovarableImage
            id={`not_image_${row.id}`}
            src={`${baseURL}${row.image}`}
            width="35"
          />
          )
        }
        
      },
     
    //   {
    //     name: t("trans_date"),
    //     selector: "created_at",
    //     sortable: false,
    //     center: true,
    //   },
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
