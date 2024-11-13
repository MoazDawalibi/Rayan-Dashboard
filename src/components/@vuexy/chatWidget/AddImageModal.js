import React, { useRef } from "react";
import {   Input,
    Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button } from "reactstrap";
import { useTranslation } from "utility/language";
import { LoadingButton } from "components/input/LoadingButton";
import { useImagePreview } from "hooks";
import ImagePreview from "components/ImagePreview";
import { buildFormData } from "api/helpers";

const AddImageModal = ({ isOpen, setIsOpen,message,setMessage,send,vendor,mutation }) => {
  const t = useTranslation();
  const ref=useRef(null)
  const { preview, handleImageChange, setPreview } = useImagePreview(null);
  const [image,setImage]=React.useState("");

  const handleSubmit = () => {
    const values={
        content:message,
        image:image,
        vendor_id:vendor
    }
    const formData=new FormData();
    buildFormData(formData,values)
        send(formData);
        setMessage("")
  };

  React.useEffect(() => {
    if (mutation.isSuccess) {
      setIsOpen(false);
      setPreview(null);
    }
  }, [mutation.isSuccess, setPreview, setIsOpen]);

  return (
    <Modal centered isOpen={isOpen} size="md">
      <ModalHeader toggle={() => setIsOpen((v) => !v)}>
        {t("message")}
      </ModalHeader>
     
            <ModalBody>
                <Button color="primary" style={{margin:"10px 0"}} type="button" onClick={()=>ref.current.click()}>
                    {t("upload_image")}
                </Button>
                <input ref={ref} type="file" style={{display:"none"}} onChange={(e)=>{
                    handleImageChange(e);
                    setImage(e.target.files[0])
                    
                    }}/>
                <ImagePreview preview={preview}/>
                <Input
                style={{margin:"10px 0"}}
              className="mr-50"
              placeholder={t("type_your_message")}
              value={message}
              onChange={e =>
                  setMessage(e.target.value)
              }
            />
             
            </ModalBody>
            <ModalFooter>
              <Button
                disabled={mutation.isLoading}
                onClick={() => setIsOpen(false)}
                color="danger"
              >
                {t("cancel")}
              </Button>
              <LoadingButton
                onClick={handleSubmit}
                color="primary"
                isLoading={mutation.isLoading}
                disabled={image===""&&message===""}
              >
                {t("add")}
              </LoadingButton>
            </ModalFooter>
  

    </Modal>
  );
};

export default AddImageModal;
