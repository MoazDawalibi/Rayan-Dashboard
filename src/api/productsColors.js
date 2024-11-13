import {
    useGetQuery,
    useAddMutation,
    useUpdateMutation,
    useDeleteMutation,
    useToggleStatus,
  } from "./helpers";
  
  const API = {
    GET: `/api/admin/colors`,
    ADD: `/api/admin/colors/add`,
    UPDATE: `/api/admin/color/update`,
    DELETE: `/api/admin/color/delete`,
    UPDATE_STATUS: `/api/admin/colors/update_color_status`,
  };
  
  const KEY = "COLORS";
  export const useGetColors = () => useGetQuery(KEY, API.GET);
  export const useAddColor = () => useAddMutation(KEY, API.ADD);
  export const useUpdateColor = () => useUpdateMutation(KEY, API.UPDATE);
  export const useDeleteColor = () =>
    useDeleteMutation(KEY, API.DELETE, "color_id", "colors");
  export const useUpdateColorStatus = () =>
    useToggleStatus(KEY, API.UPDATE_STATUS, "color_id", "colors");
  