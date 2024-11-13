import { useAddNot } from 'api/notifications'
import AuthComponent from 'components/AuthComponent'
import { LoadingButton, ValidatedField } from 'components/input'
import ProgressBar from 'components/ProgressBar'
import { Form, Formik } from 'formik'

import React from 'react'
import { history } from "../../../history";

import { Card, CardBody ,  Container } from 'reactstrap'
import { useTranslation } from 'utility/language'
import { getDataToSend, getInitialValues, getValidationSchema, get_id_from_array } from './formutils'
import NotificationForm from './NotificationForm'

function AddNotPage() {
  const {mutate, isSuccess , percentCompleted , isLoading , isError}= useAddNot()
    const t = useTranslation()
    const handleSubmit = (value)=>{
      let data_to_send = {
        ...value ,
        receiver_ids:value.send_to ==='all' ? 'all':  (get_id_from_array((value.select)))
      }
        delete data_to_send['code']
        delete data_to_send['select']
        delete data_to_send['send_to']

       mutate(getDataToSend(data_to_send))
    }
    React.useEffect(() => {
    if(isSuccess){
      history.push('/notification')
    }
    }, [isSuccess])
    
  return (
    <>
    <h3 style={{padding:5}}>{t("add_notification")}</h3>
    <Card>
        <Container style={{marginBottom:160}}>
            <h3 style={{textAlign:'center', margin:"20px 0 "}}>{t("notification_form")}</h3>
            <Formik
        onSubmit={handleSubmit}
        validationSchema={getValidationSchema}
        initialValues={getInitialValues}
      >
        {(formik) => (
          <Form>
            <CardBody>
              <NotificationForm/>
            </CardBody>
            <AuthComponent>
            <ProgressBar 
              value={percentCompleted}
              isLoading={isLoading}
              isError={isError}
              isSuccess={isSuccess}
            />
        <div className="d-flex justify-content-center align-items-center">
       
              <LoadingButton
                type="submit"
                color="primary"
                isLoading={isLoading}
              >
                {t("add")}
              </LoadingButton>
            </div>
            </AuthComponent>
            
          </Form>
        )}
      </Formik>
        </Container>
    </Card>
    </>
  )
}

export default AddNotPage
