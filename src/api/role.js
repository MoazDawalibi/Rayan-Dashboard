import {
    useGetQuery,
    useAddMutation,
    useUpdateMutation,
    useDeleteMutation,
  } from "./helpers";
  
  const API = {
    ADD: `/api/admin/role/create`,
    DELETE: `/api/admin/role/delete`,
    GET_ALL_PER:`/api/admin/role/all-permissions` ,
    GET_ALL_ROLE:`/api/admin/role/all` ,
  };
  
  const KEY = "Roles";
  
  export const useAddRole = () => useAddMutation(KEY, API.ADD);
  export const useDeleteRole = () => useDeleteMutation(KEY, API.DELETE , 'role_id');
  export const useGetAllPermission = ()=>useGetQuery("PERMISSION" , API.GET_ALL_PER);
  export const useGetAllRoles = ()=>useGetQuery(KEY , API.GET_ALL_ROLE);