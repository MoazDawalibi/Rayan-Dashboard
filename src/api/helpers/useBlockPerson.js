import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useTranslation } from "utility/language";
import { useAxios } from "./useAxios";
import { validateSession } from "./validateSession";


export const useBlockPerson = (key, url, object_id, dataName) => {
    const axios = useAxios();
    const queryClient = useQueryClient();
    const t = useTranslation();
  
    return useMutation(
      async ({ id, block_time }) => {
        const { data } = await axios.post(url, {
          [object_id]: id,
          block_timer:block_time,
        });
        return { ...data, id, block_time };
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
  