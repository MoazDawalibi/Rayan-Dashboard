import {
    useGetQuery,
    useAddMutation,
    useDeleteMutation,
 
  } from "./helpers";
import { useBlockPerson } from "./helpers/useBlockPerson";
  
  const API = {
    GET: `/api/admin/customer/all`,
    GET_ONE:`/api/admin/customer/get`,
    BLOCK: `/api/admin/customer/block-status`,
    UPDATE: `/api/admin/customer/update`,
    DELETE: `/api/admin/customer/delete`,
    GET_ORDER_CUSTOMER_WITH_OUT_PAGINITION:`/api/admin/customer/all-without-pagination` ,
    UNBLOCK:`/api/admin/customer/unblock` , 
    UPDATE_STATUS: `/api/admin/customer/update_customer_status`,
    GIFT:`api/admin/code/give-gift`,
    UPDATE_STATUS2:`/api/admin/verfiy_customer`
  };
  
  const KEY = "CUSTOMER";
  export const useGetcustomer = (params)=> useGetQuery(KEY, API.GET, params);

  export const useGetcustomerWithOutPaginition = (params)=> useGetQuery(KEY, API.GET_ORDER_CUSTOMER_WITH_OUT_PAGINITION, params);
  export const useGetSingleCustomer = (params)=> useGetQuery(KEY, API.GET_ONE, params);
  export const useBlockCustomer = () =>useBlockPerson(KEY, API.BLOCK,"customer_id" );
  export const useDeleteCustomer = ()=> useDeleteMutation(KEY, API.DELETE, 'customer_id') 
  export const useUnBlockCustomer = () =>useAddMutation(KEY, API.UNBLOCK,"customer_id" );
  export const useGiftCustoer= () =>useAddMutation(KEY, API.GIFT );


export const useToggleStatusCustomer = () =>useAddMutation(KEY, API.UPDATE_STATUS2);