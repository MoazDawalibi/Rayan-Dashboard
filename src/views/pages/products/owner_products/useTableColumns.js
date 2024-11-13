import { useMemo } from "react";
import { useUpdateProductStatus } from "api/owner_products";
import { useTranslation } from "utility/language";
import useSubCategoryOptions from "utility/selectionOptions/useSubCategoryOptions";

import useCommonTableColumns from "../common/useTableColumns";

const useTableColumns = () => {
  const t = useTranslation();
  const toggleMutation = useUpdateProductStatus();
  const subCategoryOptions = useSubCategoryOptions();

  const additionalColumns = useMemo(
    () => [
      {
        name: t("subcategory"),
        sortable: false,
        center: true,
        cell: (row) => {
          const subcategory = subCategoryOptions.find(
            (subcat) => subcat.value === row.subcategory_id
          );
          return subcategory?.label || "";
        },
      },
    ],
    [subCategoryOptions, t]
  );

  return useCommonTableColumns({ toggleMutation, additionalColumns });
};

export default useTableColumns;
