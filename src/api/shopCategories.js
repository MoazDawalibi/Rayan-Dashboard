import {
    useGetQuery,
    useAddMutation,
    useUpdateMutation,
    useDeleteMutation,
    useToggleStatus,
  } from "./helpers";
  
  const API = {
    GET: `/api/admin/shop_categories`,
    ADD: `/api/admin/shop_categories/add`,
    UPDATE: `/api/admin/shop_categories/update`,
    DELETE: `/api/admin/shop_categories/delete`,
    UPDATE_STATUS: `/api/admin/shop_categories/update_category_status`,
  };
  
  const KEY = "SHOP_CATEGORIES";    
  
  export const useGetShopCategories = (params) => useGetQuery(KEY, API.GET,params,{enabled:!!params.shop_id});
  export const useAddShopCategory = () => useAddMutation(KEY, API.ADD);
  export const useUpdateShopCategory = () => useUpdateMutation(KEY, API.UPDATE);
  export const useDeleteShopCategory = () =>
    useDeleteMutation(KEY, API.DELETE, "shop_category_id", "shop_categories");
  export const useUpdateShopCategoryStatus = () =>
    useToggleStatus(KEY, API.UPDATE_STATUS, "shop_category_id", "shop_categories");
  