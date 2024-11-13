import { useBlockDriver, useUnBlockDriver } from 'api/driver'
import { LoadingButton, ValidatedField } from 'components/input'
import React from 'react'
import { useEffect } from 'react'
import { BsExclamationCircle } from 'react-icons/bs'
import { Button, Card, CardBody, Input, Label, Modal, ModalHeader } from 'reactstrap'
import { useTranslation } from 'utility/language'
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';

function UnBlockDriverModel({isOpen ,setIsopen , objectID}) {
    const t = useTranslation()
    const {mutate:UnBlock , isSuccess , isLoading} = useUnBlockDriver()
    const handelSubmit = ()=>{

        UnBlock({driver_id:objectID})
    }
    useEffect(() => {
      if(isSuccess){
        setIsopen((v) => !v)
      }

    }, [isSuccess])
    
  return (
    <Modal isOpen={isOpen} centered size='md'>
      <ModalHeader toggle={() => setIsopen((v) => !v)}>
        {t("un_driver_block_page")}
      </ModalHeader>
        <Card>
           <CardBody>
            
            <div style={{width:"100%", display:"flex" , alignItems:"center" ,flexDirection: "column"}}>
                 <h1 style={{fontWeight:"sime-bold"}}> {t("un_blocking_driver")}</h1>
                <LockOpenOutlinedIcon  style={{fontSize:"100px" , color:"black" , margin:"20px 0"}}/>
                <div className=''>


                    <div style={{marginTop:20 }}>
                        <Button color='danger' style={{marginInline:10}} onClick={() => setIsopen((v) => !v)}>
                            {t("cancel")}
                        </Button>
                        <LoadingButton color='primary' onClick={handelSubmit }type="submit" isLoading={isLoading} >
                           {t("un_block_for_driver")}
                        </LoadingButton>
                    </div>
                </div>
            </div>
            
           </CardBody>
        </Card>
    </Modal>
  )
}

export default UnBlockDriverModel