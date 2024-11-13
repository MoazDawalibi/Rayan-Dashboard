import {
    useGetQuery,
    useDeleteMutation,
    useUpdateMutation,
    useAddMutation
  } from "./helpers";
  
  const API = {
    ADD: `/api/admin/app-setting/create`,
    GET_ALL: `/api/admin/app-setting/all`,
    UPDATE: `/api/admin/app-setting/update`,
    DELETE: `/api/admin/app-setting/delete`,

  };
const KEY = "SETTING"

export const useGetSetting = (params) => useGetQuery(KEY, API.GET_ALL, params);
export const useAddSetting = () => useAddMutation(KEY, API.ADD);
export const useUpdateSetting = () => useUpdateMutation(KEY, API.UPDATE);
export const useDeleteSetting = () =>useDeleteMutation(KEY, API.DELETE, "setting_id");
