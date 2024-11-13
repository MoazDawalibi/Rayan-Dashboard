import { PasswordField, ValidatedField } from 'components/input'
import { useFormikContext } from 'formik';
import React from 'react'
import { BiWallet } from 'react-icons/bi';
import { useTranslation } from 'utility/language'
import WalletModel from './WalletModel';
export default function AccountForm({isSuccess ,data}) {
    const formik = useFormikContext()
   React.useEffect(() => {
    formik.setFieldValue('wallet', data)
    
    }, [isSuccess])
    
    const lang = localStorage.getItem('locale')

    const role = JSON.parse(localStorage.getItem('URUK_ADMIN_USER')).role_type
    
  const [isOpen , setIsOpen]= React.useState(false)
    const t = useTranslation();
    return (
        <>
            <ValidatedField
                name="full_name"
                label={t("full_name")}
                placeholder={t("full_name")}
                
            />
            <ValidatedField
                name="email"
                label={t("email")}
                placeholder={t("email")}
                
            />
            <ValidatedField
                name="phone"
                label={t("phone")}
                placeholder={t("phone")}
                
            />
           <div style={{position:"relative", width:"100%"}}>
           <ValidatedField
                name="wallet"
                label={t("wallet")}
                placeholder={t("wallet")}
                readOnly
                
            />
            <BiWallet onClick={()=>setIsOpen(true)} style={{ display:role==='Super Admin'?'block':"none", position:"absolute" , right:lang=='en'?10:null,left:lang !=='en'?10:null, top:'42%', cursor:"pointer"}} size={30}  color="black"/>
           </div>
            <PasswordField
                name="password"
                label={t("new.password")}
                placeholder={t("new.password")}
               

            />
            <PasswordField
                name="password_confirmation"
                label={t("new.confirm_password")}
                placeholder={t("new.confirm_password")}
            />
            <WalletModel isOpen={isOpen} setIsopen={setIsOpen}/>
        </>
    )
}
