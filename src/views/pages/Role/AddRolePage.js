import { useAddRole, useGetAllPermission } from 'api/role'
import SpinnerComponent from 'components/@vuexy/spinner/Fallback-spinner'
import { LoadingButton, ValidatedField } from 'components/input'
import { Form, Formik } from 'formik'
import React from 'react'
import { Card, Col, Row } from 'reactstrap'
import { useTranslation } from 'utility/language'
import * as Yup from "yup";
import { history } from "../../../history";
import { FancyCheckbox } from './CheckBox'

function AddRolePage() {
    const t = useTranslation() 
    const {data , isLoading:PemissionLoadin} =  useGetAllPermission()
    const {mutate , isLoading , isSuccess} = useAddRole()
    const my_array = []
    const handelSubmit = (values)=>{
   
      
      mutate({
        name:values.role_name,
        permission:[...new Set(my_array)]
      })
    }   
    
     React.useEffect(() => {
      if(isSuccess){
        history.push('/accounts/role')
      }
      }, [isSuccess])
      if(PemissionLoadin){
        return <SpinnerComponent />
      }
  return (
    <>
    <h3>{t('add_role')}</h3>
     <Card style={{minHeight:'75vh', position:"relative" , padding:10 , marginBottom:20}}>
            <Formik initialValues={getInitialValues()} validationSchema={getValidationSchema()} onSubmit={handelSubmit}> 
                {
                    (formik)=>(
                         <Form>
                            <Row xl={2}>
                                <Col>
                                <ValidatedField 
                                   
                                   name="role_name"
                                   label={t("role_name")}
                                   placeholder={t("role_name")}
                                   isRequired
                                />
                                </Col>
                              
                            </Row>
                            <Row xl={2}>
                          
                    
                                
                                {
                                    data && data.map((check)=> {
                                      return <Col> 
                                       <FancyCheckbox name={check.name} checked={false} my_array={my_array} id={check.id}/> 
                                      </Col>
                                    })
                                }


                            </Row>


                    <span  style={{marginInline:"auto", display:"flex" ,width:"100%" ,justifyContent:'center' }} >
                        <LoadingButton
                        className="mt-1 float-right mx-auto"
                        color="primary"
                        isLoading={isLoading}
                        type="submit"
                            
                       
                         >
                           {true ? t("add") : t("save")}
                    </LoadingButton>
                    </span>
                     
                         </Form>
                    )
                }
                 
            </Formik>
    </Card>
    </>
  
  )
}

export default AddRolePage
function getInitialValues(editMode, objectToEdit) {
    if (editMode) {
  
      return {
        permissions:"",
      role_name:""
      };
    }
    return {
      permissions:"",
      role_name:""
    };
  }
  
  function getValidationSchema(editMode) {
    return Yup.object().shape({
      // permissions: Yup.string().required("required"),
       role_name:Yup.string().required('required')
  
    });
}
function convet_data_to_array_permission (array){
  let permission= []
  for (let index = 0; index < array.length; index++) {
    permission[index] = array[index].value;
    
  }
return permission
}