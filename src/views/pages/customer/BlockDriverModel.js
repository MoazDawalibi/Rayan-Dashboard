import { useBlockCustomer } from 'api/customer'
import { useBlockDriver } from 'api/driver'
import { LoadingButton, ValidatedField } from 'components/input'
import React from 'react'
import { useEffect } from 'react'
import { BsExclamationCircle } from 'react-icons/bs'
import { Button, Card, CardBody, Input, Label, Modal, ModalHeader } from 'reactstrap'
import { useTranslation } from 'utility/language'

function BlockCustomerModel({isOpen ,setIsopen , objectID}) {
    const t = useTranslation()
    const {mutate:BlockDriver , isSuccess , isLoading} = useBlockCustomer()
    const handelSubmit = ()=>{
      
      BlockDriver({id:objectID,block_time:document.getElementById('block_input').value})
    }
    useEffect(() => {
      if(isSuccess){
        setIsopen((v) => !v)
      }

    }, [isSuccess])
    
  return (
    <Modal isOpen={isOpen} centered size='md'>
      <ModalHeader toggle={() => setIsopen((v) => !v)}>
        {t("customer_block_page")}
      </ModalHeader>
        <Card>
           <CardBody>
            
            <div style={{width:"100%", display:"flex" , alignItems:"center" ,flexDirection: "column"}}>
                 <h1 style={{fontWeight:"bold"}}> {t("blocking_customer")}</h1>
                <BsExclamationCircle  style={{fontSize:"100px" , color:"#f8be86" , margin:"20px 0"}}/>
                <div className=''>

                    <Label for="block_input">
                     {t("date_blocking")}
                    </Label>
                    <Input
                    id='block_input'
                    placeholder={t("date_blocking")}
                    type="date"
                    />
                    <div style={{marginTop:20 }}>
                        <Button color='danger' style={{marginInline:10}} onClick={() => setIsopen((v) => !v)}>
                            {t("cancel")}
                        </Button>
                        <LoadingButton color='primary' onClick={handelSubmit} isLoading={isLoading}  type="submit">
                           {t("add_block_for_user")}
                        </LoadingButton>
                    </div>
                </div>
            </div>
            
           </CardBody>
        </Card>
    </Modal>
  )
}

export default BlockCustomerModel