import { useGetQuery } from "./helpers";
const API=`/api/admin/home-page/all-statistics`
export const useGetStatistics=(params)=>useGetQuery("STATISTICS",API, params);