import { useQueryClient, useMutation } from "react-query";
import { toast } from "react-toastify";
import { useTranslation } from "utility/language";
import { useAxios } from "./useAxios";
import { validateSession } from "./validateSession";

export const useToggleStatus = (key, url, object_id, dataName) => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const t = useTranslation();

  return useMutation(
    async ({ id, new_status }) => {
      const { data } = await axios.post(url, {
        [object_id]: id,
        new_status,
      });
      return { ...data, id, new_status };
    },
    {
      onSuccess: ({ message, id, new_status }) => {
        toast.success(message || t("toggle_success"));

        queryClient.invalidateQueries([key]);
      },
      onError: (err) => {
        const message = err?.response?.data?.message || t("toggle_failed");
        toast.error(message);
        validateSession(err.response);
      },
    }
  );
};
