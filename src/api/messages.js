import {
    useGetQuery,
    useAddMutation,
    useUpdateMutation

  } from "./helpers";
  
  const API = {
    GET: `/api/admin/vendor-messages`,
    ADD: `/api/admin/message/send`,
    UPDATE_STATUS:`/api/admin/message/update`

  };
  
  const KEY = "MESSAGES";
  export const useGetMessages = (params) => useGetQuery(KEY, API.GET,params,{enabled:!!params.vendor_id});
  export const useAddMessage = () => useAddMutation(KEY, API.ADD);
  export const useUpdateMessageStatus=()=>useUpdateMutation(KEY,API.UPDATE_STATUS,false)

  