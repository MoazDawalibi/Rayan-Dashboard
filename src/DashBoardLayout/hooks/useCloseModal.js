import { Form, Formik } from 'formik'
import React from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { LoadingButton } from "components/input/LoadingButton";
import { useTranslation } from "utility/language";
import { useModal } from './zustand';

function ModelLayout({isAddModal , headerText , handleSubmit =()=>{} , getInitialValues  , getValidationSchema,isLoading = false ,children}) {

  const  {isOpenAddModel ,setIsOpenAddModel , setIsOpenEditModel ,isOpenEditModel , objectToEdit} = useModal(state => state)
    const t = useTranslation()
    return (
    <Modal centered isOpen={isAddModal ? isOpenAddModel :isOpenEditModel} size="lg">
      <ModalHeader toggle={() => isAddModal ?setIsOpenAddModel() : setIsOpenEditModel()}>
        {t(headerText)}
      </ModalHeader>
      {
        
          (objectToEdit && !isAddModal) &&
          <Formik
          onSubmit={handleSubmit}
          initialValues={getInitialValues}
          validationSchema={getValidationSchema}
        >
          
          {(formik) => (
            <Form>
              <ModalBody>
               {children}
              </ModalBody>
              <ModalFooter>
                <Button
                  disabled={isLoading}
                  onClick={() => isAddModal ?setIsOpenAddModel() : setIsOpenEditModel()}
                  color="danger"
                >
                  {t("cancel")}
                </Button>
                <LoadingButton
                  type="submit"
                  color="primary"
                  isLoading={isLoading}
                >
                  {t(isAddModal ? "add" :"edit")}
                </LoadingButton>
              </ModalFooter>
            </Form>
          )}
        </Formik>
        }
     
    </Modal>
  )
}

export default ModelLayout