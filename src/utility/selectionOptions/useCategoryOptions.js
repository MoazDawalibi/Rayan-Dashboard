import React from "react";
import { useBackendLanguageCode } from "utility/language/useLanguageCode";
import { mapTranslatedProperties } from "helpers/language";
import { useGetCategories } from "api/categories";
import { useTranslation } from "utility/language";

const useCategoryOptions = ({ withAllOption = false } = {}) => {
  const languageCode = useBackendLanguageCode();
  const { data } = useGetCategories();
  const t = useTranslation();

  return React.useMemo(() => {
    let options = [];
    if (data && data.categories && Array.isArray(data.categories)) {
      options = data.categories.map((category) => ({
        value: category.id,
        label: mapTranslatedProperties(
          category.category_details,
          "category_name",
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

export default useCategoryOptions;
