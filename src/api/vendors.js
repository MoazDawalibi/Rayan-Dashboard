import {
    useGetQuery,

  } from "./helpers";
  
  const API = {
    GET: `/api/admin/vendors`,
  
  };
  
  const KEY = "DELIVERY";
  export const useGetVendors = () => useGetQuery(KEY, API.GET);

  