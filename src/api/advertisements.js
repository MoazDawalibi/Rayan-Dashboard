import {
    useGetQuery,
    useAddMutation,
    useUpdateMutation,
    useDeleteMutation,
    useToggleStatus,
} from "./helpers";

const API = {
    GET: `/api/admin/sliders`,
    ADD: `/api/admin/slider/add`,
    UPDATE: `/api/admin/slider/update`,
    DELETE: `/api/admin/slider/delete`,
    UPDATE_STATUS: `/api/admin/slider/update_slider_status`,
};

const KEY = "CUSTOM_SLIDERS_WITHOUT_BUTTON";

export const useGetCustomWithoutBtnAds = () => useGetQuery(KEY, API.GET);
export const useAddCustomWithoutBtnAd = () => useAddMutation(KEY, API.ADD);
export const useUpdateCustomWithoutBtnAd = () => useUpdateMutation(KEY, API.UPDATE);
export const useDeleteCustomWithoutBtnAd = () =>
    useDeleteMutation(KEY, API.DELETE, "slider_id", "sliders");
export const useToggleCustomWithoutBtnAdStatus = () =>
    useToggleStatus(KEY, API.UPDATE_STATUS, "slider_id", "sliders");
