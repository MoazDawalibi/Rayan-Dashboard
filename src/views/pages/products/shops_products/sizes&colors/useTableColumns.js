import React, { useMemo } from "react";
import { useDeleteProductVariation } from "api/shops_products";
import { useBackendLanguageCode, useTranslation } from "utility/language";
import Actions from "components/table/TableActions";
// import { history } from "../../../history";
import { mapTranslatedProperties } from "helpers/language";


const useTableColumns = (setEditModal, setObjectToEdit) => {
  const t = useTranslation();
  const deleteMutation = useDeleteProductVariation();
  const langCode=useBackendLanguageCode();
  return useMemo(
    () => [
   
      {
        name: `${t("color")}`,
        sortable: false,
        center: true,
        cell: (row) =>row.color?<div style={{margin:"5px",padding:"15px",borderRadius:"5px",backgroundColor:row.color.color_hexacode}}>
            <p style={{padding:"1px",backgroundColor:"#FFF",margin:"0",textAlign:"center"}}>

          {mapTranslatedProperties(row.color.color_details, "color_name", langCode)}
            </p>
        </div>:t("no_color_chosen")
      },
      {
        name: `${t("size")}`,
        sortable: false,
        center: true,
        cell: (row) =>
       row.size? mapTranslatedProperties(row.size.size_details, "size_name", langCode):t("no_size_chosen"),
      },
      {
        name: t("quantity"),
        selector: "quantity",
        sortable: true,
        center: true,
      },
      {
        name: t("price"),
        selector: "price",
        sortable: true,
        center: true,
        cell: (row) =><>
                {row.size?<p>{row.price}</p>:t("no_size_chosen")} 
        </>
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
    [t, deleteMutation, setEditModal, setObjectToEdit,langCode]
  );
};

export default useTableColumns;
