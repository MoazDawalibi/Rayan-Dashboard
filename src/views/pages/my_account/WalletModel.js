import { useUpdateWallet } from 'api/accounts'
import { LoadingButton, ValidatedField } from 'components/input'
import { useFormikContext } from 'formik'
import React from 'react'
import { useEffect } from 'react'
import { BiWallet } from 'react-icons/bi'
import { BsExclamationCircle } from 'react-icons/bs'
import { Button, Card, CardBody, Input, Label, Modal, ModalHeader } from 'reactstrap'
import { useTranslation } from 'utility/language'

function WalletModel({isOpen ,setIsopen }) {
    const formik =useFormikContext()
  
    const t = useTranslation()
    const {mutate,isSuccess, isLoading}= useUpdateWallet()
    const [value, seValue]=React.useState(0) 
    const handelSubmit = ()=>{
        const val = document.getElementById('value').value

        mutate({
            value:val
        })
        seValue(val)
    }
    useEffect(() => {
      if(isSuccess){
        formik.setFieldValue("wallet", +(formik.getFieldProps('wallet').value)+(+value))
        setIsopen((v) => !v)
      }

    }, [isSuccess])
  return (
    <Modal isOpen={isOpen} centered size='md'>
      <ModalHeader toggle={() => setIsopen((v) => !v)}>
    
      </ModalHeader>
        <Card>
           <CardBody>
            
            <div style={{width:"100%", display:"flex" , alignItems:"center" ,flexDirection: "column"}}>
                 <h1 style={{fontWeight:"bold"}}> {t("add_to_wallet")}</h1>
                <BiWallet  style={{fontSize:"100px" , color:"#f8be86" , margin:"20px 0"}}/>
                <div className=''>

                    <Label for="block_input">
                     {t("value")}
                    </Label>
                    <Input
                    id='value'
                    placeholder={t("value")}
                    type="number"
                    />
                    <div style={{marginTop:20 }}>
                        <Button color='danger' style={{marginInline:10}} onClick={() => setIsopen((v) => !v)}>
                            {t("cancel")}
                        </Button>
                        <LoadingButton type="submit" isLoading={isLoading}  color='primary' onClick={handelSubmit}>
                           {t("add")}
                        </LoadingButton>
                    </div>
                </div>
            </div>
            
           </CardBody>
        </Card>
    </Modal>
  )
}

export default WalletModel