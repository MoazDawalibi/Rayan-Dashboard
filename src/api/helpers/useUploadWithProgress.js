import { useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import { toast } from "react-toastify";
import { useTranslation } from "utility/language";
import { useAxios } from "./useAxios";
import { validateSession } from "./validateSession";

export const useUploadWithProgress = (key, url) => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const t = useTranslation();
  const [percentCompleted, setPercentCompleted] = useState(0.0);

  const mutation = useMutation(
    async (dataToSend) => {
      setPercentCompleted(0.0);
      const { data } = await axios.post(url, dataToSend, {
        onUploadProgress: (event) => {
          setPercentCompleted(Math.round((event.loaded * 100) / event.total));
        },
      });
      return data;
    },
    {
      onSuccess: ({ message }) => {
        toast.success(message || t("_messages.success.upload"));
        queryClient.invalidateQueries([key]);
      },
      onError: (err) => {
        const message =
          err?.response?.data?.message || t("_messages.error.upload");
        toast.error(message);
        validateSession(err.response);
      },
    }
  );

  return {
    percentCompleted,
    ...mutation,
  };
};
