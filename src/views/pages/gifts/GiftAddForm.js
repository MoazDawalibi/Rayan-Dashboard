import React from "react";
import { ValidatedField } from "components/input/ValidatedField";
import { useTranslation } from "utility/language";
import { Row, Col } from "reactstrap";
// import {  useFormikContext } from "formik";
import { LoadingButton } from "components/input/LoadingButton";
import { useState } from "react";
import OrderSelectDriverModal from "./TableColumn/GiftSelectDriverModal";
import OrderSelectCustomerModal from "./TableColumn/GiftSelectCustomerModal";
import { useFormikContext } from "formik";

const CodeAddForm = () => {
  const [OpenCutomerModal , setOpenCutomerModal] = useState(false)
  const [OpenDriverModal , setOpenDriverModal] = useState(false)
  const t = useTranslation();
  const formik = useFormikContext()
 

  return (
    <>
      <Row xs={1} sm={1} md={1} lg={2} xl={2}>
      <Col>

         <ValidatedField
          name="gift_value"
          label={t("value")}
          placeholder={t("value")}
          type="number"
          
        />
      </Col> 
    </Row>
     <Row xs={1} sm={1} md={1} lg={2} xl={2}>
     <Col>
      <ValidatedField
          name="name"
          label={t("name")}
          placeholder={(formik.getFieldProps
            ("gift_name").value == "" ?t("enter_button_select")  : 
            formik.getFieldProps("gift_name").value   )}
          type="number"
          readOnly={true}
        />
      </Col>
      <Col className="d-flex align-items-center">
      <LoadingButton
       
          
                outline
                onClick={()=>{
                  setOpenDriverModal(o => !o)
                } }
              >
                {t("select_driver")}
              </LoadingButton>
              <p className="" style={{margin:"10px 10px"}}>OR</p>
              <LoadingButton
               
                outline   
                onClick={()=>{
                  setOpenCutomerModal(o => !o)
                } }
              >
                {t("select_customer")}
              </LoadingButton>
      </Col>
      
    </Row>
  
   
    <OrderSelectDriverModal isOpen={OpenDriverModal} setIsOpen={setOpenDriverModal}  />
      <OrderSelectCustomerModal isOpen={OpenCutomerModal} setIsOpen={setOpenCutomerModal}  /> 
 
    </>
  );
};

export default CodeAddForm;
