import {
    useGetQuery,

  } from "./helpers";
  
  const API = {
    GET: `/api/admin/transaction/all`,

  
  };
  
  const KEY = "TRANSACTIONS";
  export const useGetAllTransaction = (params) => useGetQuery(KEY, API.GET, params);

  