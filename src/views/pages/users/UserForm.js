import React from "react";
import { ValidatedField } from "components/input/ValidatedField";
import { useTranslation } from "utility/language";
import { useFormikContext } from "formik";
import Checkbox from "components/@vuexy/checkbox/CheckboxesVuexy";
import { Check } from "react-feather";

const UserForm = ({ editMode = false }) => {
  const t = useTranslation();
  const formik = useFormikContext();

  return (
    <>
      <ValidatedField
        name="full_name"
        label={t("full_name")}
        placeholder={t("full_name")}
        required
      />
      <ValidatedField
        name="phone"
        label={t("phone")}
        placeholder={t("phone")}
        required
      />
      <ValidatedField
        name="email"
        label={t("email")}
        placeholder={t("email")}
        required
      />
      <Checkbox
        color="primary"
        icon={<Check className="vx-icon" size={16} />}
        label={t("is_verified")}
        checked={formik.values.is_verified}
        onChange={() =>
          formik.setFieldValue("is_verified", !formik.values.is_verified)
        }
      />
    </>
  );
};

export default UserForm;
