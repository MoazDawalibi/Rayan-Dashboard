import { useBlockCustomer, useUnBlockCustomer } from 'api/customer'
import { useBlockDriver } from 'api/driver'
import { LoadingButton, ValidatedField } from 'components/input'
import React from 'react'
import { useEffect } from 'react'
import { BsExclamationCircle } from 'react-icons/bs'
import { Button, Card, CardBody, Input, Label, Modal, ModalHeader } from 'reactstrap'
import { useTranslation } from 'utility/language'
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';

function UnBlockCustomerModel({isOpen ,setIsopen , objectID}) {
    const t = useTranslation()
    const {mutate:UnBlock , isSuccess,isLoading} = useUnBlockCustomer()
    const handelSubmit = ()=>{
        UnBlock({customer_id:objectID})
    }
    useEffect(() => {
      if(isSuccess){
        setIsopen((v) => !v)
      }

    }, [isSuccess])
    
  return (
    <Modal isOpen={isOpen} centered size='md'>
      <ModalHeader toggle={() => setIsopen((v) => !v)}>
        {t("un_customer_block_page")}
      </ModalHeader>
        <Card>
           <CardBody>
            
            <div style={{width:"100%", display:"flex" , alignItems:"center" ,flexDirection: "column"}}>
                 <h1 style={{fontWeight:"semi-bold"}}> {t("un_blocking_customer")}</h1>
                <LockOpenOutlinedIcon  style={{fontSize:"100px" , color:"black" , margin:"20px 0"}}/>
                <div className=''>


                    <div style={{marginTop:20 }}>
                        <Button color='danger' style={{marginInline:10}} onClick={() => setIsopen((v) => !v)}>
                            {t("cancel")}
                        </Button>
                        <LoadingButton type="submit" isLoading={isLoading} color='primary' onClick={handelSubmit}>
                           {t("un_block_for_customer")}
                        </LoadingButton>
                    </div>
                </div>
            </div>
            
           </CardBody>
        </Card>
    </Modal>
  )
}

export default UnBlockCustomerModel