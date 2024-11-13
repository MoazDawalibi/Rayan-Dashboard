import React from "react";
import { ValidatedField } from "components/input/ValidatedField";
import { Row, Col } from "reactstrap";
import { useTranslation } from "utility/language";

const SingleLanguage = ({ langID, langCode }) => {
  const t = useTranslation();
  const lang = ` (${t(langCode)})`;

  return (
    <>
      <ValidatedField
        name={`translated_fields[${langID}][auction_name]`}
        label={t("auction_name") + lang}
        placeholder={t("auction_name") + lang}
        isRequired
      />

      <ValidatedField
        name={`translated_fields[${langID}][auction_mobile_description]`}
        label={t("auction_mobile_description") + lang}
        placeholder={t("auction_mobile_description") + lang}
        as="textarea"
      />
    </>
  );
};

const LanguageBasedForm = () => {
  return (
    <Row xs={1} sm={1} md={1} lg={2} xl={2}>
      <Col dir="ltr">
        <SingleLanguage langID={1} langCode="en" />
      </Col>
      <Col dir="rtl">
        <SingleLanguage langID={2} langCode="ar" />
      </Col>
    </Row>
  );
};

export default LanguageBasedForm;
