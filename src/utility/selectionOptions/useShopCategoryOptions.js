import React from "react";
import { useBackendLanguageCode } from "utility/language/useLanguageCode";
import { mapTranslatedProperties } from "helpers/language";
import { useTranslation } from "utility/language";
import { useGetShopCategories } from "api/shopCategories";

const useShopCategoryOptions = ({ withAllOption = false,shop_id } = {}) => {
  const languageCode = useBackendLanguageCode();
  const { data } = useGetShopCategories({shop_id:shop_id});
  const t = useTranslation();

  return React.useMemo(() => {
    let options = [];
    if (data && data.shop_categories && Array.isArray(data.shop_categories)) {
      options = data.shop_categories.map((category) => ({
        value: category.id,
        label: mapTranslatedProperties(
          category.shop_category_details,
          "shop_category_name",
          languageCode
        ),
      }));
    }

    if (withAllOption) {
      return [{ label: t("all"), value: "" }, ...options];
    }
    return options;
  }, [data, languageCode, withAllOption, t]);
};

export default useShopCategoryOptions;
