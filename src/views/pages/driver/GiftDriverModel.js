import { useBlockDriver, useGiftDriver } from 'api/driver'
import { LoadingButton, ValidatedField } from 'components/input'
import React from 'react'
import { useEffect } from 'react'
import { BsExclamationCircle } from 'react-icons/bs'
import { Button, Card, CardBody, Col, Input, Label, Modal, ModalHeader, Row } from 'reactstrap'
import { useTranslation } from 'utility/language'

function GiftDriverModel({isOpen ,setIsopen , objectID}) {
    const t = useTranslation()
    const {mutate:Gift , isLoading , isSuccess} = useGiftDriver()
    useEffect(()=>{
      if(isSuccess){
        setIsopen((v) => !v)
      }
    },[isSuccess])
  return (
    <Modal isOpen={isOpen} centered size='md'>
      <ModalHeader toggle={() => setIsopen((v) => !v)}>
        {t("driver_gift_page")}
      </ModalHeader>
        <Card>
           <CardBody>
            
            <Row>
                <Col className='' style={{width:300}}>
                    <Label for="enter_code">
                     {t("value")}
                    </Label>
                    <Input
                    min={0} 
                    
                    name='value'
                    id='enter_codes'
                    placeholder={t("value")}
                    type="number"
                    />
                    <Col style={{marginTop:20 , display:"flex" , justifyContent:"space-between"}}>
                        <Button color='danger'  onClick={() => setIsopen((v) => !v)}>
                            {t("cancel")}
                        </Button>
                        <LoadingButton type="submit" isLoading={isLoading}  color='primary' onClick={()=>{
                          if(document.getElementById('enter_codes').value){
                             Gift({type:'driver', id:objectID ,value:document.getElementById('enter_codes').value})
                         
                          }
                         

                        }}>
                           {t("gift")}
                        </LoadingButton>
                    </Col>
                </Col>
            </Row>
            
           </CardBody>
        </Card>
    </Modal>
  )
}

export default GiftDriverModel