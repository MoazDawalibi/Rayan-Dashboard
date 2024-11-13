import { useMemo } from "react";
import { useUpdateProductStatus } from "api/shops_products";
import { useTranslation } from "utility/language";
import useShopsOptions from "utility/selectionOptions/useShopsOptions";

import useCommonTableColumns from "../common/useTableColumns";

const useTableColumns = () => {
  const t = useTranslation();
  const toggleMutation = useUpdateProductStatus();
  const shopsOptions = useShopsOptions();

  const additionalColumns = useMemo(
    () => [
      {
        name: t("shop"),
        sortable: false,
        center: true,
        cell: (row) => {
          const shop = shopsOptions.find(
            (subcat) => subcat.value === row.shop_id
          );
          return shop?.label || "";
        },
      },
    ],
    [shopsOptions, t]
  );

  return useCommonTableColumns({ toggleMutation, additionalColumns });
};

export default useTableColumns;
