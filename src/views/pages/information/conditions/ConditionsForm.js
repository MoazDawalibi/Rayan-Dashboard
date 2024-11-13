import React from "react";
import { Formik, Form } from "formik";
import { useTranslation } from "utility/language";
import { LoadingButton } from "components/input/LoadingButton";
import { useUpdateConditions } from "api/information";
import { getInitialValues } from "./formUtils";

import SingleLangEditor from "../SingleLangEditor";
import AuthComponent from "components/AuthComponent";

const ConditionsForm = ({ conditions }) => {
  const t = useTranslation();
  const { mutate: updateInfo, isLoading } = useUpdateConditions();

  return (
    <Formik onSubmit={updateInfo} initialValues={getInitialValues(conditions)}>
      {(formik) => (
        <Form>
          <SingleLangEditor langCode={1} property="conditions_description" />
          <hr />
          <SingleLangEditor langCode={2} property="conditions_description" />
          <hr />
          <AuthComponent>
            <div className="w-100 d-flex align-items-center justify-content-center">
              <LoadingButton
                color="primary"
                type="submit"
                isLoading={isLoading}
              >
                {t("save")}
              </LoadingButton>
            </div>
          </AuthComponent>
        </Form>
      )}
    </Formik>
  );
};

export default ConditionsForm;
