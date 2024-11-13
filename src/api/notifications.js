import {
  useGetQuery,
  useAddMutation,
  useUploadWithProgress,
} from "./helpers";

const API = {
  GET: `/api/admin/latest-news/all`,
  ADD: `/api/admin/latest-news/create`,
};

const KEY = "NOT";
export const useGetNotifications = (params) => useGetQuery(KEY, API.GET, params);
export const useAddNot = () => useUploadWithProgress(KEY, API.ADD);

