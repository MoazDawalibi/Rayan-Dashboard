import React from "react";
import { useBackendLanguageCode } from "utility/language/useLanguageCode";
import { mapTranslatedProperties } from "helpers/language";
import { useGetColors } from "api/productsColors";

const useColorsOptions = ({ withNoneOption = true } = {}) => {
  const languageCode = useBackendLanguageCode();
  const { data } = useGetColors();

  return React.useMemo(() => {
    let options = [];
    if (data ) {
      options =Object.values(data).map((color) => ({
        color:color.color_hexacode,
        value: color.id,
        label: mapTranslatedProperties(
          color.color_details,
          "color_name",
          languageCode
        ),
      }));
    }

    if (withNoneOption) {
      return [{ label: "---", value: "",color:"#4E8075" }, ...options];
    }
    return options;
  }, [data, languageCode, withNoneOption]);
};

export default useColorsOptions;
