import React from "react";
import { Formik, Form } from "formik";
import { useTranslation } from "utility/language";
import { LoadingButton } from "components/input/LoadingButton";
import { useUpdatePrivacy } from "api/information";
import { getInitialValues } from "./formUtils";

import SingleLangEditor from "../SingleLangEditor";
import AuthComponent from "components/AuthComponent";

const PrivacyForm = ({ privacy }) => {
  const t = useTranslation();
  const { mutate: updateInfo, isLoading } = useUpdatePrivacy();
const handel =(values)=>{
  
  let about = {
    content_en:values.translated_fields['1'].privacy_description, 
    content_ar:values.translated_fields['2'].privacy_description
  }
  updateInfo(about)
}
  return (
    <Formik onSubmit={handel} initialValues={getInitialValues(privacy)}>
      {(formik) => (
        <Form>
          <SingleLangEditor langCode={1} property="privacy_description" />
          <hr />
          <SingleLangEditor langCode={2} property="privacy_description" />
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

export default PrivacyForm;
