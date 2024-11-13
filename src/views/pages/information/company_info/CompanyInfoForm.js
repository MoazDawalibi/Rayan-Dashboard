import React from "react";
import { Formik, Form } from "formik";
import { useTranslation } from "utility/language";
import { LoadingButton } from "components/input/LoadingButton";
import { useUpdateCompanyInfo } from "api/information";
import { getInitialValues } from "./formUtils";
import { ValidatedField } from "components/input/ValidatedField";
import { Row, Col } from "reactstrap";
import AuthComponent from "components/AuthComponent";

const CompanyInfoForm = ({ company_info }) => {
  const t = useTranslation();
  const { mutate: updateInfo, isLoading } = useUpdateCompanyInfo();

  return (
    <Formik
      onSubmit={updateInfo}
      initialValues={getInitialValues(company_info)}
    >
      {(formik) => (
        <Form>
          <ValidatedField
            name="translated_fields[1][address]"
            label={`${t("address")} (${t("en")})`}
            placeholder={`${t("address")} (${t("en")})`}
          />
          <ValidatedField
            name="translated_fields[2][address]"
            label={`${t("address")} (${t("ar")})`}
            placeholder={`${t("address")} (${t("ar")})`}
          />
          <Row xs={1} sm={1} md={2} lg={2} xl={2}>
            <Col>
              <ValidatedField
                name="email"
                label={t("email")}
                placeholder={t("email")}
              />
            </Col>
            <Col>
              <ValidatedField
                name="phone"
                label={t("phone")}
                placeholder={t("phone")}
              />
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

export default CompanyInfoForm;
