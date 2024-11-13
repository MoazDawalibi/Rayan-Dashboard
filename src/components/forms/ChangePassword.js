import React from "react";
import { useTranslation } from "utility/language";
import { PasswordField } from "components/input/PasswordField";
import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  password: Yup.string().required("_required.password"),
  c_password: Yup.string()
    .required("_required.password")
    .oneOf([Yup.ref("password"), null], "validation.passwords_match"),
});

export const initialValues = {
  password: "",
  c_password: "",
};

const ChangePassword = ({ id, mutation }) => {
  const t = useTranslation();

  return (
    <>
      <PasswordField
        name="password"
        label={t("password")}
        placeholder="Password"
      />
      <PasswordField
        name="c_password"
        label={t("confirm_password")}
        placeholder="Confirm Password"
      />
    </>
  );
};

export default ChangePassword;
