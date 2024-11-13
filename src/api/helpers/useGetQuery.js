import { useQuery } from "react-query";
import { useTranslation } from "utility/language";
import { useAxios } from "./useAxios";

export const useGetQuery = (key, url, params = null, options = {}) => {
  const axios = useAxios();
  const t = useTranslation();

  return useQuery(
    params ? [key, params] : key,
    async () => {
      const { data } = await axios.get(url, { params });
      return data.data;
    },
    {
      ...options
    }
  );
};
