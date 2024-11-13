import { formatToBackend } from "helpers/date";
import {
    useGetQuery,
    useAddMutation,
    useUpdateMutation,
    useDeleteMutation,
    useToggleStatus,
  } from "./helpers";
  
  const API = {
    GET: `/api/admin/discounts`,
    ADD: `/api/admin/discount/add`,
    UPDATE: `/api/admin/discount/update`,
    DELETE: `/api/admin/discount/delete`,
    UPDATE_STATUS: `/api/admin/discount/update_status`,
  };
  const KEY="DISCOUNTS";
  export const useGetDiscounts=()=>useGetQuery(KEY,API.GET);
  export const useAddDiscount = () => useAddMutation(KEY, API.ADD);
export const useUpdateDiscount = () => useUpdateMutation(KEY, API.UPDATE);
export const useDeleteDiscount = () =>
  useDeleteMutation(KEY, API.DELETE, "discount_id", );
export const useUpdateDiscountStatus = () =>
  useToggleStatus(KEY, API.UPDATE_STATUS, "discount_id", );
  export const changeSentTime=(values)=>{
    const end_at=formatToBackend(values.end_at);
    const start_at=formatToBackend(values.start_at);
    return {...values,start_at,end_at}
  }