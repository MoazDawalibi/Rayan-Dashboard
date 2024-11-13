import { useUpdateProductStatus } from "api/shops_products";
import useCommonTableColumns from "views/pages/products/common/useTableColumns";

const useTableColumns = () => {
  const toggleMutation = useUpdateProductStatus();
  return useCommonTableColumns({ toggleMutation });
};

export default useTableColumns;
