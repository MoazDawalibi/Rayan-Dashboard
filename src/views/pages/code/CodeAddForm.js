import React from "react";
import { ValidatedField } from "components/input/ValidatedField";
import { useTranslation } from "utility/language";
import { Row, Col } from "reactstrap";

const CodeAddForm = () => {
  const t = useTranslation();
  return (
    <Row xs={1} sm={1} md={1} lg={2} xl={2}>
      <Col>
      <ValidatedField
          name="code_number"
          label={t("code_number")}
          placeholder={t("code_number")}
          type="number"
        />
      </Col>
      <Col>
      <ValidatedField
          name="code_value"
          label={t("value")}
          placeholder={t("value")}
          type="number"
        />
      </Col>
    </Row>
  );
};

export default CodeAddForm;
