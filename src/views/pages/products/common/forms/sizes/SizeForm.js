import React from "react";
import { ValidatedField } from "components/input/ValidatedField";
import { useTranslation } from "utility/language";

const SizeForm = () => {
  const t = useTranslation();

  return (
    <>

        <ValidatedField

          name="size"
          label={`${t("size")}`}
          placeholder={`${t("size")}`}
          isRequired={true}

        />
        <ValidatedField
        
          name="price"
          label={`${t("price")}`}
          placeholder={`${t("price")}`}
          type="number"
          isRequired={true}
        />

</>

  );
};

export default SizeForm;
