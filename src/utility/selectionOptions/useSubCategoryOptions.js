import React from "react";
import { useBackendLanguageCode } from "utility/language/useLanguageCode";
import { mapTranslatedProperties } from "helpers/language";
import { useGetSubCategories } from "api/subcategories";
import { useTranslation } from "utility/language";

const useSubCategoryOptions = ({ withAllOption = false } = {}) => {
  const languageCode = useBackendLanguageCode();
  const { data } = useGetSubCategories();
  const t = useTranslation();

  return React.useMemo(() => {
    let options = [];
    if (data && data.subcategories && Array.isArray(data.subcategories)) {
      options = data?.subcategories.map((subcategory) => ({
        value: subcategory.id,
        label: mapTranslatedProperties(
          subcategory.subcategory_details,
          "subcategory_name",
          languageCode
        ),
        category_id: subcategory.category_id,
      }));
    }
    if (withAllOption) {
      return [{ label: t("all"), value: null }, ...options];
    }
    return options;
  }, [data, languageCode, withAllOption, t]);
};

export default useSubCategoryOptions;
