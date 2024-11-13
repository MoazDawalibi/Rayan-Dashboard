import React from "react";
import { ValidatedField } from "components/input/ValidatedField";
import { useTranslation } from "utility/language";
import { Row, Col } from "reactstrap";
import { check_key_id_precent } from "./formUtils";
import Checkbox from "components/@vuexy/checkbox/CheckboxesVuexy";
import { Check } from "react-feather";
import { useFormikContext } from "formik";
const SettingForm = ({edit=false}) => {
  const lang = localStorage.getItem('locale')
  const t = useTranslation();
  const formik = useFormikContext()
  return (
    <Row xs={1} sm={1} md={1} lg={2} xl={2}>
      <Col>
        {/* <ValidatedField
          dir="ltr"
          name="translated_fields[1][setting_name]"
          label={`${t("setting_name")} (${t("en")})`}
          placeholder={`${t("setting_name")} (${t("en")})`}
        /> */}
        <ValidatedField
          dir="rtl"
          name="setting_name"
          label={`${t("setting_name")}`}
          placeholder={`${t("setting_name")}`}
          readOnly={edit ?true : false}
        />
       
      </Col>
      <Col style={{position:"relative"}}>
      <ValidatedField
          name="setting_value"
          label={`${t("value")} ${t(check_key_id_precent(edit.key)?"precent":'')}`}
          placeholder={`${t("value")} ${t(check_key_id_precent(edit.key)?"precent":'')}`}
          type="number"
        />
        {check_key_id_precent(edit.key) &&<p style={{position:'absolute' , right:lang==='en'?20:null,left:lang !=='en'?20:null, top:'40%' , color:'black', fontWeight:'bold', fontSize:20}}>%</p>}
      </Col>
      {
        edit.key === 'cash_back' &&  <div style={{marginInline:'30px'}}>
        <Checkbox
          color="primary"
          
          icon={<Check className="vx-icon" size={16} />}
          label={t("is_percentage")}
          checked={formik.values.is_percentage}
          onChange={() =>
            formik.setFieldValue(
              "is_percentage",
              !formik.values.is_percentage === true ? 1 : 0
            )
          }
        />
      </div>
      }
    </Row>
  );
};

export default SettingForm;
