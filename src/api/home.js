import { useGetQuery } from './helpers'
const API = {

    STATISTICS: "/api/admin/statistics",
    YEARSTATISTICS: "/api/admin/yearly_statistics"

}
const KEY = {
    STATISTICS: "STATISTICS",
    YEARLY_STATISTICS: "YEARLYSTATISTICS"
}
export const useGetStatistics = () => useGetQuery(KEY.STATISTICS, API.STATISTICS);
export const useGetYearlyStatistics = (params) => useGetQuery(KEY.YEARLY_STATISTICS, API.YEARSTATISTICS, params);