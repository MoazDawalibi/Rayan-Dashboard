import {
  useGetQuery,
  useAddMutation,
  useUpdateMutation,
  useDeleteMutation,
  useToggleStatus,
} from "./helpers";

const API = {
  GET: `/api/admin/subcategories`,
  ADD: `/api/admin/subcategories/add`,
  UPDATE: `/api/admin/subcategories/update`,
  DELETE: `/api/admin/subcategories/delete`,
  UPDATE_STATUS: `/api/admin/subcategories/update_subcategory_status`,
};

const KEY = "SUBCATEGORIES";
export const useGetSubCategories = () => useGetQuery(KEY, API.GET);
export const useAddSubCategory = () => useAddMutation(KEY, API.ADD);
export const useUpdateSubCategory = () => useUpdateMutation(KEY, API.UPDATE);
export const useDeleteSubCategory = () =>
  useDeleteMutation(KEY, API.DELETE, "subcategory_id", "subcategories");
export const useUpdateSubCategoryStatus = () =>
  useToggleStatus(KEY, API.UPDATE_STATUS, "subcategory_id", "subcategories");
