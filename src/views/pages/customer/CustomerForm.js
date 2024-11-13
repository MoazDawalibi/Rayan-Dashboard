import React from "react";
import { ValidatedField } from "components/input/ValidatedField";
import { useTranslation } from "utility/language";
import { useFormikContext } from "formik";
import ImagePreview from "components/ImagePreview";
import { Row, Col } from "reactstrap";

import { useImagePreview } from "hooks";
import { baseURL } from "api/config";

const CustomerForm = ({editMode = false }) => {
  const t = useTranslation();
  const formik = useFormikContext();

  const {preview , handleImageChange } = useImagePreview(baseURL+ formik.getFieldProps('customer_image').value)

  return (
    <Row xs={1} sm={1} md={1} lg={2} xl={2}>
      <Col>
          <ValidatedField
          name="customer_name"
          label={t("name")}
          placeholder={t("name")}
          type="string"
          required
          readOnly
        />
       
          <ValidatedField
          name="customer_phone"
          label={t("customer_phone")}
          placeholder={t("customer_phone")}
          type="text"
          required
          readOnly
        />
         
         <ValidatedField
          name="customer_code"
          label={t("customer_code")}
          placeholder={t("customer_code")}
          type="text"
          required
          readOnly
        />
           <ValidatedField
          name="created_at"
          label={t("join_at")}
          placeholder={t("join_at")}
          type="text"
          required
          readOnly
        />
         
         <ValidatedField
          name="customer_city"
          label={t("customer_city")}
          placeholder={t("customer_city")}
          type="text"
          required
          readOnly
        />
    
      </Col>
      <Col>
      <label>{t('customer_image')}</label>
        <ImagePreview preview={preview} />
            <div style={{color:'white', marginTop:-2}}>.</div>
        <ValidatedField
          name="customer_wallet"
          label={t("customer_wallet")}
          placeholder={t("customer_wallet")}
          type="text"
          required
          readOnly
        />
      </Col>
    </Row>
  );
};

export default CustomerForm;
