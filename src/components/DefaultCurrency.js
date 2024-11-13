import React from 'react'
import { LoadingButton } from './input';
import PaidIcon from '@mui/icons-material/Paid';
import CustomConfirmAlert from 'extensions/confirm-alert';
import { toast } from 'react-toastify';
import { useTranslation } from 'utility/language';
import { useUpdateTranslatedLabels } from 'extensions/confirm-alert/useUpdateTranslatedLabels';
export default function DefaultCurrency({ defaultMutation, row }) {
  const options=useUpdateTranslatedLabels();
  const t=useTranslation();
  return (
    <LoadingButton
      color={row.is_default ? "primary" : "danger"}
      onClick={
        !row.is_default?() =>
          CustomConfirmAlert({
            onConfirm: () => {
              toast.info(t("_loading.delete"));
              defaultMutation.mutate({ currency_id: row.id })
            },
            ...options,
          }):()=>{}
        }
      isLoading={defaultMutation.isLoading}
      style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <PaidIcon />
    </LoadingButton>
  )
}
