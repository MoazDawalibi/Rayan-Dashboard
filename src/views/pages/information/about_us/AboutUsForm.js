import React from "react";
import { Formik, Form } from "formik";
import { Row, Col } from "reactstrap";
import { useTranslation } from "utility/language";
import { LoadingButton } from "components/input/LoadingButton";
import { useUpdateAboutUs } from "api/information";

import { useImagePreview } from "hooks/useImagePreview";
import ImagePreview from "components/ImagePreview";
import { ValidatedField } from "components/input/ValidatedField";
import { mapTranslatedProperties } from "helpers/language";
import { baseURL } from "api/config";

import { getInitialValues, getDataToSend } from "./formUtils";
import SingleLangEditor from "../SingleLangEditor";
import AuthComponent from "components/AuthComponent";

const AboutUsForm = ({ about_us }) => {
  const t = useTranslation();
  const { mutate: updateInfo, isLoading } = useUpdateAboutUs();


  const handleSubmit = (values) => {
    let about = {
      content_en:values.translated_fields['1'].about_us_description, 
      content_ar:values.translated_fields['2'].about_us_description
    }
    updateInfo(about);
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={getInitialValues(about_us)}>
      {(formik) => (
        <Form>
          <Row xs={1} sm={1} md={1} lg={2} xl={2}>
            <Col>
              <SingleLangEditor langCode={1} property="about_us_description" />
              <hr />
             
            </Col>
            <Col>
            <SingleLangEditor langCode={2} property="about_us_description" />
            </Col>
          </Row>

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

export default AboutUsForm;
