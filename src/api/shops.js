import {
  useGetQuery,
  useAddMutation,
  useUpdateMutation,
  useDeleteMutation,
  useToggleStatus,
} from "./helpers";

const API = {
  GET: `/api/admin/shops`,
  GET_SINGLE_SHOP: `/api/admin/shop`,
  ADD: `/api/admin/shops/add`,
  UPDATE: `/api/admin/shops/update`,
  DELETE: `/api/admin/shops/delete`,
  UPDATE_STATUS: `/api/admin/shops/update_status`,
};

const KEY = "SHOPS";
export const useGetShops = () => useGetQuery(KEY, API.GET);
export const useAddShop = () => useAddMutation(KEY, API.ADD);
export const useUpdateShop = () => useUpdateMutation(KEY, API.UPDATE);
export const useDeleteShop = () =>
  useDeleteMutation(KEY, API.DELETE, "shop_id", "shops");
export const useUpdateShopStatus = () =>
  useToggleStatus(KEY, API.UPDATE_STATUS, "shop_id", "shops");

export const useGetSingleShop = (shop_id) =>
  useGetQuery(
    "SINGLE_SHOP",
    API.GET_SINGLE_SHOP,
    { shop_id },
    { enabled: !!shop_id }
  );
