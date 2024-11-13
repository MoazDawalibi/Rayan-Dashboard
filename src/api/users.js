import { useGetQuery, useDeleteMutation, useUpdateMutation } from "./helpers";

const API = {
  GET_USERS: `/api/admin/users`,
  UPDATE: `/api/admin/user/update`,
  UPDATE_PASSWORD: `/api/admin/account/change-password`,
  DELETE: `/api/admin/user/delete`,
};

const KEY = "USERS";
export const useGetUsers = (params) => useGetQuery(KEY, API.GET_USERS, params);
export const useUpdateUser = () => useUpdateMutation(KEY, API.UPDATE);
export const useUpdateUserPassword = () =>
  useUpdateMutation(KEY, API.UPDATE_PASSWORD);
export const useDeleteUser = () =>
  useDeleteMutation(KEY, API.DELETE, "user_id");
