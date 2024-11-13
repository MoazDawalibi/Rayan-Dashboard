import React from "react";
import { useGetSizes } from "api/productsSizes";
import { mapTranslatedProperties } from "helpers/language";
import { useBackendLanguageCode } from "utility/language";

const useProductsSizesOptions = ({ withNoneOption = true } = {}) => {
  const languageCode = useBackendLanguageCode();
  
  const { data } = useGetSizes();


  return React.useMemo(() => {
    let options = [];
    if (data  && Array.isArray(data)) {
      options = data.map((size) => ({
        value: size.id,
        label: mapTranslatedProperties(
          size.size_details,
          "size_name",
          languageCode
        ),
      }));
    }

    if (withNoneOption) {
      return [{ label: "---", value: "" }, ...options];
    }
    return options;
  }, [data, withNoneOption,languageCode]);
};

export default useProductsSizesOptions;
