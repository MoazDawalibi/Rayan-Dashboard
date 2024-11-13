import { Key } from "react-feather";
import {
    useGetQuery,
    useAddMutation,
    useUpdateMutation,
    useDeleteMutation,
    useToggleStatus,
    useUploadWithProgress,
  } from "./helpers";
import { useBlockPerson } from "./helpers/useBlockPerson";
  
  const API = {
    GET: `/api/admin/driver/all`,
    SINGLE_DRIVER:`/api/admin/driver/get`,
    GET_ORDER_DRIVER:`/api/admin/driver/orders` ,
    GET_ORDER_DRIVER_WITH_OUT_PAGINITION:`/api/admin/driver/all-without-pagination` ,
    ADD: `/api/admin/driver/add`,
    UPDATE: `/api/admin/driver/update`,
    DELETE: `/api/admin/driver/delete`,
    UPDATE_STATUS: `/api/admin/driver/update_driver_status`,
    SENDNOT:`/api/admin/driver/accept`,
    BLOCK:`api/admin/driver/block-status`,
    GIFT:`api/admin/code/give-gift`,
    UNBLOCK:`api/admin/driver/unblock`,
    IMAGES:`api/admin/driver/update`,
    UPDATE_STATUS2:`/api/admin/verfiy_driver`

  };
  
  const KEY = "DRIVER";
  export const useGetDriver = (params) => useGetQuery(KEY, API.GET, params);
  export const useGetSingleDriver=(params)=>useGetQuery("SINGLE",API.SINGLE_DRIVER,params);
  export const useGetDriverForSelect=(params)=>useGetQuery("SINGLE",API.GET_ORDER_DRIVER_WITH_OUT_PAGINITION,params);
  export const useGetDriverOrder = (params) => useGetQuery(KEY, API.GET_ORDER_DRIVER , params);
  export const useAddDriver = () => useAddMutation(KEY, API.ADD);
  export const useUpdateDriver = () => useUpdateMutation(KEY, API.UPDATE);
  export const useDeleteDriver = () =>useDeleteMutation(KEY, API.DELETE, "driver_id", "driver");
  export const useBlockDriver = () =>useBlockPerson(KEY, API.BLOCK,"driver_id" );
  export const useGiftDriver = () =>useAddMutation(KEY, API.GIFT );
  export const useAcceptedDriver = ()=>useAddMutation(KEY ,API.SENDNOT )
  export const useUnBlockDriver = () => useAddMutation(KEY, API.UNBLOCK);
  export const useUpdateSingleDriver = ()=> useUploadWithProgress(KEY , API.IMAGES )

  export const useToggleStatusDriver = () =>useAddMutation(KEY, API.UPDATE_STATUS2);