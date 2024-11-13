import { mapTranslatedProperties } from "helpers/language";

export const getInitialValues = (privacy) => ({
  translated_fields: {
    1: {
      privacy_description:privacy[1].locale==="en"? (privacy[1]?.content): (privacy[0]?.content)
    },
    2: {
      privacy_description:privacy[1].locale==="ar"? (privacy[1]?.content): (privacy[0]?.content)
        },
  },
});
