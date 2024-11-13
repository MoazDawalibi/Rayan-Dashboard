import React from "react";
import { useBackendLanguageCode } from "utility/language/useLanguageCode";
import { mapTranslatedProperties } from "helpers/language";
import { useGetDiscounts } from "api/discounts";

const useDiscountOptions = ({ withNoneOption = true } = {}) => {
  const languageCode = useBackendLanguageCode();
  const { data } = useGetDiscounts();

  return React.useMemo(() => {
    let options = [];
    if (data && data.discounts && Array.isArray(data.discounts)) {
      options = data.discounts.map((discount) => ({
        value: discount.id,
        label: mapTranslatedProperties(
          discount.discount_details,
          "discount_name",
          languageCode
        ),
      }));
    }

    if (withNoneOption) {
      return [{ label: "---", value: "" }, ...options];
    }
    return options;
  }, [data, languageCode, withNoneOption]);
};

export default useDiscountOptions;
