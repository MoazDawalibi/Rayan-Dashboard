import React from 'react'
import { 
    Modal, ModalBody, ModalHeader } from "reactstrap";
export default function ImageModal({image,isOpen,setIsOpen}) {
  return (
    <Modal centered isOpen={isOpen} size="xl">
        <ModalHeader toggle={() => setIsOpen((v) => !v)} />
            <ModalBody>

                <img alt="Message_big_image" src={image} style={{width:"100%",maxHeight:"75vh",objectFit:"contain"}}/>

            </ModalBody>

    </Modal>
  )
}
