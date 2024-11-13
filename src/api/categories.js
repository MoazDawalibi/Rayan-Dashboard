import {
  useGetQuery,
  useAddMutation,
  useUpdateMutation,
  useDeleteMutation,
  useToggleStatus,
} from "./helpers";

const API = {
  GET: `/api/admin/categories`,
  ADD: `/api/admin/categories/add`,
  UPDATE: `/api/admin/categories/update`,
  DELETE: `/api/admin/categories/delete`,
  UPDATE_STATUS: `/api/admin/categories/update_category_status`,
};

const KEY = "CATEGORIES";
export const useGetCategories = () => useGetQuery(KEY, API.GET);
export const useAddCategory = () => useAddMutation(KEY, API.ADD);
export const useUpdateCategory = () => useUpdateMutation(KEY, API.UPDATE);
export const useDeleteCategory = () =>
  useDeleteMutation(KEY, API.DELETE, "category_id", "categories");
export const useUpdateCategoryStatus = () =>
  useToggleStatus(KEY, API.UPDATE_STATUS, "category_id", "categories");
