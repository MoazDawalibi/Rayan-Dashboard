import React from "react";
import { useBackendLanguageCode } from "utility/language/useLanguageCode";
import { mapTranslatedProperties } from "helpers/language";
import { useGetShops } from "api/shops";
import { useTranslation } from "utility/language";

const useShopsOptions = ({ withAllOption = false } = {}) => {
  const languageCode = useBackendLanguageCode();
  const { data } = useGetShops();
  const t = useTranslation();

  return React.useMemo(() => {
    let options = [];
    if (data && data.shops && Array.isArray(data.shops)) {
      options = data.shops.map((shop) => ({
        value: shop.id,
        label: mapTranslatedProperties(
          shop.shop_details,
          "shop_name",
          languageCode
        ),
      }));
    }

    if (withAllOption) {
      return [{ label: t("all"), value: null }, ...options];
    }
    return options;
  }, [data, languageCode, withAllOption, t]);
};

export default useShopsOptions;
