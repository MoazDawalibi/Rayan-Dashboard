import { useMemo } from "react";
import { useTranslation } from "utility/language";

export const useUpdateTranslatedLabels = () => {
  const t = useTranslation();

  return useMemo(
    () => ({
      title: t("_currency.update_are_you_sure"),
      confirmBtnText: t("_currency.yes_update_it"),
      cancelBtnText: t("_currency.cancel"),
      body: t("_currency.body"),
    }),
    [t]
  );
};
