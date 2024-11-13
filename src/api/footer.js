import { useGetQuery, useUpdateMutation } from './helpers'
const KEY = "FOOTER"
const API = {
    GET: "/api/admin/footer",
    UPDATE: "/api/admin/footer/update"
}
export const useGetFooter = () => useGetQuery(KEY, API.GET);
export const useUpdateFooter = () => useUpdateMutation(KEY, API.UPDATE);