import React from "react";
import { Form, Formik } from "formik";
import { ValidatedField } from "components/input/ValidatedField";
import { Row, Col } from "reactstrap";
import { Phone } from "react-feather";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { ADMIN, Roles, SUPER_ADMIN, VENDOR} from "configs/Roles";
import { RadioInput } from "components/input/RadioInput";
import { useTranslation } from "utility/language";
import * as Yup from "yup";
import "./index.css";
import PropTypes from "prop-types";
import { LoadingButton } from "components/input/LoadingButton";
import useShopsOptions from "utility/selectionOptions/useShopsOptions";
import { getDataToSend } from "api/accounts";
import Select from 'react-select';
import { convet_data_to_select } from "./utils";
import { useGetAllRoles } from "api/role";


export const RegisterForm = ({ mutation, editMode, objectToEdit }) => {
  const t = useTranslation();
  const {data} = useGetAllRoles();

  const rolesOptions = convet_data_to_select(data||[])
  (rolesOptions);
  
    
  

  const handleSubmit = (values) => {
  
    const dataToSend = getDataToSend(values, editMode, objectToEdit);
    mutation.mutate(dataToSend);
  };

  return (
    <Formik
      initialValues={getInitialValues(editMode, objectToEdit)}
      validationSchema={getValidationSchema(editMode)}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form>
       <Row lg={2} xl={2}>
        <Col>
        <ValidatedField
            name="full_name"
            label={t("full_name")}
            placeholder={t("full_name")}
            icon={PersonOutlineOutlinedIcon}
            isRequired
          />
          
        </Col>
        <Col>
              <h5 className="ml-1 mb-8">{t("role")}</h5>
              <Select options={rolesOptions}  
              onChange={(e)=> formik.setFieldValue('role_name',e.value)} /> 
              <p style={{color:'red'}}>{formik.errors.role_name} </p>
            </Col>
       </Row>
          <Row xs={1} sm={1} md={2} lg={2} xl={2}>
            <Col>
              <ValidatedField
                name="email"
                label={t("email")}
                placeholder={t("email")}
                type="email"
                icon={MailOutlineIcon}
                autoComplete="new-password"
                isRequired
              />
            </Col>
            <Col>
              <ValidatedField
                name="phone"
                label={t("phone")}
                placeholder={t("phone")}
                // icon={Phone}
                isRequired
              />
            </Col>
            {!editMode && (
              <>
                <Col>
                  <ValidatedField
                    name="password"
                    label={t("password")}
                    placeholder={t("password")}
                    type="password"
                    autoComplete="new-password"
                    icon={LockOutlinedIcon}
                    isRequired
                  />
                </Col>
                <Col>
                  <ValidatedField
                    name="password_confirmation"
                    label={t("confirm_password")}
                    placeholder={t("confirm_password")}
                    type="password"
                    autoComplete="new-password"
                    icon={LockOutlinedIcon}
                    isRequired
                  />
                </Col>
              </>
            )}
          </Row>
          <Row xs={1} sm={1} md={2} lg={2} xl={2}>
          <Col>
                  {/* <ValidatedField
                    name="password_confirmation"
                    label={t("confirm_password")}
                    placeholder={t("confirm_password")}
                    type="password"
                    autoComplete="new-password"
                    icon={LockOutlinedIcon}
                    isRequired
                  /> */}
                </Col>
          </Row>
      
          <LoadingButton
            isLoading={mutation.isLoading}
            className="mt-1 float-right"
            color="primary"
            type="submit"
          >
            {!editMode ? t("add") : t("save")}
          </LoadingButton>
        </Form>
      )}
    </Formik>
  );
};
RegisterForm.propTypes = {
  editMode: PropTypes.bool,
  objectToEdit: PropTypes.object,
};
RegisterForm.defaultProps = {
  editMode: false,
  objectToEdit: {},
};

function getInitialValues(editMode, objectToEdit) {
  if (editMode) {

    return {
      full_name: objectToEdit.full_name,
      email: objectToEdit.email,
      phone: objectToEdit.phone,
      role: objectToEdit.role_type,
      password: "",
      password_confirmation: "",

      shop_id:objectToEdit.shop_id || ""
      
    };
  }
  return {
    full_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: "",
    role_name: Roles[0],
 
    shop_id:""
  };
}

function getValidationSchema(editMode) {
  return Yup.object().shape({
    full_name: Yup.string().required("required"),
    email: Yup.string().email("validation.invalid_email").required("required"),
    phone: Yup.string().required("required"),
    role_name:Yup.string().required("required"),
     shop_id:Yup.string().notRequired()
     .when("role",{is:val=>val==="vendor",then:Yup.string().required("required"),otherwise:Yup.string().notRequired()}),
    ...(!editMode && {
      password: Yup.string().required("required"),
      // password_confirmation: Yup.string()
      //   .required("required")
      //   .oneOf([Yup.ref("password"), null], "validation.password_match"),
    }),
  });
}
