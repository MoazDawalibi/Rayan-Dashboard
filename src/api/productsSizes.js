import {
    useGetQuery,
    useAddMutation,
    useUpdateMutation,
    useDeleteMutation,
    useToggleStatus,
  } from "./helpers";
  
  const API = {
    GET: `/api/admin/sizes`,
    ADD: `/api/admin/size/add`,
    UPDATE: `/api/admin/size/update`,
    DELETE: `/api/admin/size/delete`,
    UPDATE_STATUS: `/api/admin/sizes/update_size_status`,
  };
  
  const KEY = "SIZES";
  export const useGetSizes = () => useGetQuery(KEY, API.GET);
  export const useAddSize = () => useAddMutation(KEY, API.ADD);
  export const useUpdateSize = () => useUpdateMutation(KEY, API.UPDATE);
  export const useDeleteSize = () =>
    useDeleteMutation(KEY, API.DELETE, "size_id", "sizes");
  export const useUpdateColorStatus = () =>
    useToggleStatus(KEY, API.UPDATE_STATUS, "color_id", "colors");
  