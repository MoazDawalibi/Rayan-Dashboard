import React from "react";
import { ValidatedField } from "components/input/ValidatedField";
import Select  from "react-select";
import { useTranslation } from "utility/language";
import { useFormikContext } from "formik";
import ImagePreview from "components/ImagePreview";
import { Row, Col } from "reactstrap";
import { selectFailGender } from "./formUtils";
import { useImagePreview } from "hooks";
import { baseURL } from "api/config";

const DriverForm = ({editMode = false }) => {
  const t = useTranslation();
  const formik = useFormikContext();
  const {preview, handleImageChange}= useImagePreview(baseURL+formik.getFieldProps('driver_image')?.value)
  return (
    <Row xs={1} sm={1} md={1} lg={2} xl={2}>
      <Col>
          <ValidatedField
          name="driver_name"
          label={t("name")}
          placeholder={t("name")}
          type="string"
          
          
        />
       
          <ValidatedField
          name="code"
          label={t("driver_code")}
          placeholder={t("driver_code")}
          type="text"
          
          
        />
         
          <ValidatedField
          name="driver_birthday"
          label={t("driver_birthday")}
          placeholder={t("driver_birthday")}
          type="text"
          
          
        />
          <ValidatedField
          name="driver_phone"
          label={t("phone")}
          placeholder={t("phone")}
          type="text"
          
          
        />
    
       <label>{t("gender")}</label>
         <Select
          label={t("gender")}
          options={selectFailGender}
          name="driver_gender"
          value={selectFailGender.find(e => e.value == formik.getFieldProps("driver_gender").value  )}
          onChange={(opt) => {
            formik.setFieldValue("driver_gender", opt.value);
          }}
          
        /> 
      </Col>
      <Col>
      <ValidatedField
          id="driver_image"
          type="file"
          label={t("driver_image")}
          name="driver_image"
          accept="image/*"
          onChange={(e) => {
            handleImageChange(e);
            formik.setFieldValue("driver_image", e.target.files[0]);
          }}
        />
      
        <ImagePreview preview={preview} />
        <p style={{color:'white' , marginBottom:-3}}>d</p>
        {/* <ValidatedField
          name="driver_gender"
          label={t("driver_gender")}
          placeholder={t("driver_gender")}
          type="text"
          
          
        /> */}
        
             <ValidatedField
          name="driver_wallet"
          label={t("driver_wallet")}
          placeholder={t("driver_wallet")}
          type="text"
          readOnly
          
        />
            <ValidatedField
          name="created_at"
          label={t("join_at")}
          placeholder={t("join_at")}
          type="text"
          
          readOnly
          
        />
          <ValidatedField
          name="driver_city"
          label={t("city")}
          placeholder={t("city")}
          type="text"
          
          readOnly
        />
       
      </Col>
    </Row>
  );
};

export default DriverForm;
