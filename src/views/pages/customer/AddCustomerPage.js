import React from "react";
import { Card, CardHeader, CardTitle, CardBody, Button } from "reactstrap";
import { useTranslation } from "utility/language";
import { Formik, Form } from "formik";
import Tabs from "components/Tabs";
import { getInitialValues, getValidationSchema } from "./formUtils";

import { history } from "../../../history";


import useFormTabs from "./useFormTabs";
import {  useGetSingleCustomer } from "api/customer";
import { useParams } from "react-router-dom";
import SpinnerComponent from "components/@vuexy/spinner/Fallback-spinner";
import { Rating } from "react-simple-star-rating";

const AddCustomerPage = () => {
  const t = useTranslation();
  const {id} = useParams()
  const {data , isLoading} = useGetSingleCustomer({customer_id:id})

  const tabs = useFormTabs();


if(isLoading){
  return <SpinnerComponent />
}
  return (
    <Card>
      <CardHeader>
        <CardTitle style={{display:"flex"  , flexDirection:"column" , justifyContent:"center"}}>
          {t("customer_information")}
          <Rating  initialValue={data?.customer_rate}  size={40}readonly={true} style={{display:"block"}}/>
        </CardTitle>
        <Button
          color="primary"
          onClick={() => history.push('/customer')}
        >
          {t("back")}
        </Button>
      </CardHeader>
      <CardBody>
        {
          data &&  <Formik
          onSubmit={()=>{}}
          initialValues={ getInitialValues(data)}
          validationSchema={getValidationSchema()}
        >
          {(formik) => (
            <Form>
              <Tabs tabs={tabs} />

            </Form>
          )}
        </Formik>
        }
       
      </CardBody>
    </Card>
  );
};


export default AddCustomerPage;
