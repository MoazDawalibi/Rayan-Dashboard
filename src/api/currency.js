import {
    useGetQuery,
    useAddMutation,
    useUpdateMutation,
    useDeleteMutation,
    useToggleStatus,
  } from "./helpers";
  
  const API = {
    GET: `/api/admin/currencies`,
    ADD: `/api/admin/currency/add`,
    UPDATE: `/api/admin/currency/update`,
    DELETE: `/api/admin/currency/delete`,
    UPDATE_STATUS: `/api/admin/currency/update_status`,
    SET_DEFAULT:`/api/admin/currency/set_default`
  };
  const KEY="CURRENCY";
  export const useGetCurrencies=()=>useGetQuery(KEY,API.GET);
  export const useAddCurrency = () => useAddMutation(KEY, API.ADD);
export const useUpdateCurrency = () => useUpdateMutation(KEY, API.UPDATE);
export const useDeleteCurrency = () =>
  useDeleteMutation(KEY, API.DELETE, "currency_id", );
export const useUpdateCurrencyStatus = () =>
  useToggleStatus(KEY, API.UPDATE_STATUS, "currency_id", );
  export const useSetDefaultCurrency=()=>useUpdateMutation(KEY,API.SET_DEFAULT)