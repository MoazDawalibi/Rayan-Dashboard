import React from 'react'
import { Formik, Form } from 'formik';
import { Card, CardBody, CardHeader, CardFooter } from 'reactstrap';
import { useTranslation } from 'utility/language';
import { initialValues, validationSchema } from './utils'
import { useAuth } from 'redux/hooks/auth';
import AccountForm from './AccountForm';
import { LoadingButton } from 'components/input';
import {useGetWallet, useUpdateMyAccount } from 'api/accounts';
import { useUpdateUserPassword } from 'api/users';
import SpinnerComponent from 'components/@vuexy/spinner/Fallback-spinner';
export default function MyAccount() {
    const t = useTranslation();
    const { user, updateUserInfo } = useAuth();
    const {data, isLoading, isSuccess, isFetching}= useGetWallet()
    
 
    const mutation = useUpdateMyAccount();
    const [values, setValues] = React.useState({});
    const handleSubmit = (values) => {
       
        const new_data = {
            ...values , 
            account_id :user.id
        }
        mutation.mutate(new_data)
    
        const valuesToUpdate = {
            full_name: values?.full_name,
            email: values.email,
            phone: values.phone,
            password:values.password,
            password_confirmation:values.password_confirmation
        }
        const newuserData = { ...user, ...valuesToUpdate }
        setValues(newuserData)
    }
    React.useEffect(() => {
        if (mutation.isSuccess) {
            updateUserInfo(values)
        }
    }, [mutation.isSuccess, updateUserInfo, values])
    React.useEffect(() => {
        if (isSuccess) {
           
        }
    }, [isSuccess])

    if(isLoading ||isFetching){
        return <SpinnerComponent/>
    }
    return (
        <Card >
            <CardHeader>
                {t("my_account")}
            </CardHeader>

            {
                !isLoading &&(
                    
            <Formik initialValues={initialValues(user,data)} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {
                (formik) => <Form>
                    <CardBody>
                        <AccountForm isSuccess={isSuccess} data={data}/>
                    </CardBody>
                    <CardFooter>
                        <LoadingButton
                            type="submit"
                            color="primary"
                            isLoading={mutation.isLoading}

                        >
                            {t("save")}
                        </LoadingButton>
                    </CardFooter>
                </Form>
            }
        </Formik>

                )
            }


        </Card>
    )
}