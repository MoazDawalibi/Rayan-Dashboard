import React, { useMemo } from "react";
import { useTranslation } from "utility/language";
import Actions from "components/table/TableActions";
import { useDeleteCode } from "api/code";

const useTableColumns = (setEditModal, setObjectToEdit) => {
  const t = useTranslation();
  const deleteMutation = useDeleteCode();

  return useMemo(
   
    () => [
      {
        name: `${t("code")}`,
        sortable: false,
        center: true,
        selector:"code" 
      },
      {
        name: t("value"),
        sortable: false,
        center: true,
        cell:(row)=> +(row.value)
      },
      {
        name: t("created_by"),
        sortable: false,
        center: true,
        cell:(row)=> {
 
          return (row?.user_name)
        }
      },

      {
        name: t("status"),
        
        sortable: false,
        center: true,
        cell:(row)=>{

          return(
            <p style={{
              background:!row.deleted_at ?'#19ab27':'#ea5454',
              color:"white",
              padding:6,
              borderRadius:10,
              position:"relative",
              top:'7px'
            }}>
              {
                !row.deleted_at ? t('available') : t('unavailable')

              }
            </p>
          ) 
        }
      },
      {
        name: t("created_at"),
        selector: "created_at",
        sortable: true,
        center: true,
      },
      // {
      //   name: "#",
      //   sortable: false,
      //   center: true,
      //   cell: (row) => (
      //     <Actions
      //       showEdit={false}
      //       onEdit={() => {
      //         console.log(row);
      //         setEditModal(true);
      //         setObjectToEdit(row);
      //       }}
      //       onDelete={() => deleteMutation.mutate({ id: row.id })}
      //     />
      //   ),
      // },
    ],
    [t, deleteMutation, setEditModal, setObjectToEdit ]
  );
};

export default useTableColumns;
