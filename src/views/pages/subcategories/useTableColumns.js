import React, { useMemo } from "react";
import {
  useDeleteSubCategory,
  useUpdateSubCategoryStatus,
} from "api/subcategories";
import { useBackendLanguageCode, useTranslation } from "utility/language";
import Actions from "components/table/TableActions";
// import { history } from "../../../history";
import { mapTranslatedProperties } from "helpers/language";
import { ToggleStatus } from "components/ToggleStatus";
import HovarableImage from "components/HovarableImage";
import { baseURL } from "api/config";

const useTableColumns = (categories, setEditModal, setObjectToEdit) => {
  const t = useTranslation();
  const deleteMutation = useDeleteSubCategory();
  const toggleMutation = useUpdateSubCategoryStatus();
  const languageCode = useBackendLanguageCode();

  return useMemo(
    () => [
      {
        name: t("sort"),
        selector: "subcategory_sort",
        sortable: true,
        center: true,
      },
      {
        name: t("image"),
        sortable: false,
        center: true,
        cell: (row) => (
          <HovarableImage
            id={`subcategory_image_${row.id}`}
            src={`${baseURL}${row.subcategory_image}`}
            width="35"
          />
        ),
      },
      {
        name: `${t("name")} (${t("en")})`,
        sortable: false,
        center: true,
        cell: (row) =>
          mapTranslatedProperties(
            row.subcategory_details,
            "subcategory_name",
            1
          ),
      },
      {
        name: `${t("name")} (${t("ar")})`,
        sortable: false,
        center: true,
        cell: (row) =>
          mapTranslatedProperties(
            row.subcategory_details,
            "subcategory_name",
            2
          ),
      },
      {
        name: t("category"),
        sortable: false,
        center: true,
        cell: (row) => {
          const category =
            categories?.find((item) => item.id === row.category_id) || {};
          if (!category.category_details) return "";
          return mapTranslatedProperties(
            category.category_details,
            "category_name",
            languageCode
          );
        },
      },
      {
        name: t("products_count"),
        selector: "products_count",
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

export default useTableColumns;
