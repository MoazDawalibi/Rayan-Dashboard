import {
    useGetQuery,
  } from "./helpers";
  
  const API = {
    GET: `/api/admin/driver-rate/all`,
  };
  
  const KEY = "RATE";
  export const useGetDriverRate = (params) => useGetQuery(KEY, API.GET,params);
 
  