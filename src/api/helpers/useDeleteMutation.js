import { useQueryClient, useMutation } from "react-query";
import { toast } from "react-toastify";
import { useTranslation } from "utility/language";
import { useAxios } from "./useAxios";
import { validateSession } from "./validateSession";

export const useDeleteMutation = (key, url, object_id) => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const t = useTranslation();
  return useMutation(
    async ({ id }) => {
      const { data } = await axios.post(url, {
        [object_id]: id,
      });
      return { ...data, id };
    },
    {
      onSuccess: ({ message}) => {
        toast.success(message || t("deleted_successfully"));
        queryClient.invalidateQueries([key]);
      },
      onError: (err) => {
        const message =
          err?.response?.data?.message || t("failed_to_delete_data");
        toast.error(message);
        validateSession(err.response);
      },
    }
  );
};
