import { mapTranslatedProperties } from "helpers/language";

export const getInitialValues = (conditions) => ({
  translated_fields: {
    1: {
      conditions_description:
        mapTranslatedProperties(conditions, "conditions_description", 1) || "",
    },
    2: {
      conditions_description:
        mapTranslatedProperties(conditions, "conditions_description", 2) || "",
    },
  },
});
