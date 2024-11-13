import React from "react";
import { Card, CardHeader, CardTitle, CardBody, Button } from "reactstrap";
import { useTranslation } from "utility/language";
import { Formik, Form } from "formik";
import Tabs from "components/Tabs";
import { change_values_shap, getInitialValues, getValidationSchema } from "./form/formUtils";

import { buildFormData } from "api/helpers";
import { LoadingButton } from "components/input/LoadingButton";

import { history } from "../../../history";

import ProgressBar from "components/ProgressBar";

import AuthComponent from "components/AuthComponent";
import { changeSentTime, useAddAuction } from "api/auctions";
import useFormTabs from "./useFormTabs";
import { useGetSingleDriver, useUpdateSingleDriver } from "api/driver";
import { useLocation, useParams } from "react-router-dom";
import SpinnerComponent from "components/@vuexy/spinner/Fallback-spinner";
import { Rating } from "react-simple-star-rating";

const AddDriverPage = (props) => {
  const t = useTranslation();
  const {id} = useParams()
  const {data, isLoading} = useGetSingleDriver({ driver_id: id })
  const {isLoading:Loading,isError,isSuccess,percentCompleted ,mutate} = useUpdateSingleDriver()

  const tabs = useFormTabs(data?.images);

  const handelsubmit = (values)=>{
    
      console.log(values);
    const new_images =(change_values_shap((values)))
    const new_obj = {
       images:new_images,
        driver_id :id,
        full_name:values['driver_name'],
        code:values['code'],
        gender:values['driver_gender'] == 'Male' ? 0 :1,
        birthday:values['driver_birthday'],
      phone:values['driver_phone'],
      car_model:values['car_model'],
      car_color:values['car_color'],
      car_seat_count:values['car_seat_count'],
      car_type:values['car_type'],
      license_id:values['license_id'],
      nationality_id:values['nationality_id'],
      residential_card_number:values['residential_card_number'],
      yearly_id:values['yearly_id'],
      driver_image:values['driver_image']

  
}
// console.log(new_obj)
const formData = new FormData();
    buildFormData(formData, new_obj);
    mutate(formData)
  }
  
if(isLoading){
  return <SpinnerComponent />
}
  return (
    <Card>
      <CardHeader>
        <CardTitle style={{display:"flex"  , flexDirection:"column" , justifyContent:"center"}}>
          {t("driver_information")}
          <Rating  initialValue={data?.driver_rate}  size={40}readonly={true} style={{display:"block"}}/>
        </CardTitle>
       
        <Button
          color="primary"
          onClick={() => history.push('/driver')}
        >
          {t("back")}
        </Button>
      </CardHeader>
      <CardBody>
        {
          data &&
           <Formik
          onSubmit={handelsubmit}
          initialValues={getInitialValues(data)}
          validationSchema={getValidationSchema()}
        >
          {(formik) => (
            <Form>
              <Tabs tabs={tabs} />
              <AuthComponent>
                <ProgressBar
                  value={percentCompleted}
                  isLoading={Loading}
                  isError={isError}
                  isSuccess={isSuccess}
                />
                <div className="d-flex justify-content-center align-items-center">
                  <LoadingButton
                    type="submit"
                    color="primary"
                    isLoading={Loading}
                  >
                    {t("save")}
                  </LoadingButton>
                </div>
              </AuthComponent>
            </Form>
          )}
        </Formik>
        }
       
      </CardBody>
    </Card>
  );
};


export default AddDriverPage;
