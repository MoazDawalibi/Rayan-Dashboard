import React, { useMemo } from "react";
import { useDeleteCategory, useUpdateCategoryStatus } from "api/categories";
import { useTranslation } from "utility/language";
import Actions from "components/table/TableActions";
// import { history } from "../../../history";
import { mapTranslatedProperties } from "helpers/language";
import { ToggleStatus } from "components/ToggleStatus";
import HovarableImage from "components/HovarableImage";
import { baseURL } from "api/config";

const useTableColumns = (setEditModal, setObjectToEdit) => {
  const t = useTranslation();
  const deleteMutation = useDeleteCategory();
  const toggleMutation = useUpdateCategoryStatus();

  return useMemo(
   
    () => [
      {
        name: t("sort"),
        selector: "category_sort",
        sortable: true,
        center: true,
      },
      {
        name: t("image"),
        sortable: false,
        center: true,
        cell: (row) => { 
          return(
          <HovarableImage
            id={`category_image_${row.id}`}
            src={`${baseURL}${row.category_image}`}
            width="35"
          />
        )},
      },
      {
        name: `${t("name")} (${t("en")})`,
        sortable: false,
        center: true,
        cell: (row) =>
          mapTranslatedProperties(row.category_details, "category_name", 1),
      },
      {
        name: `${t("name")} (${t("ar")})`,
        sortable: false,
        center: true,
        cell: (row) =>
          mapTranslatedProperties(row.category_details, "category_name", 2),
      },
      {
        name: t("subcategories_count"),
        selector: "subcategories_count",
        sortable: true,
        center: true,
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
    [t, deleteMutation, toggleMutation, setEditModal, setObjectToEdit]
  );
};

export default useTableColumns;
