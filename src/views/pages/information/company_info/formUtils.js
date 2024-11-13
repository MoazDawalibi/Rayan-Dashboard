import { mapTranslatedProperties } from "helpers/language";

export const getInitialValues = (company_info) => {
  const { email, phone } = mapTranslatedProperties(
    company_info,
    ["email", "phone"],
    1
  );

  return {
    translated_fields: {
      1: {
        address: mapTranslatedProperties(company_info, "address", 1) || "",
      },
      2: {
        address: mapTranslatedProperties(company_info, "address", 2) || "",
      },
    },
    email: email || "",
    phone: phone || "",
  };
};
