import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button } from "reactstrap";
import { useTranslation } from "utility/language";
import { Formik, Form, useFormikContext } from "formik";
import SizeForm from "./SizeForm";


const AddCatModal = ({ isOpen, setIsOpen }) => {
  const t = useTranslation();
  const formik=useFormikContext();


  const handleSubmit = (values) => {
        const newValues=[...formik.values.sizes,{...values}]
        formik.setFieldValue("sizes",newValues);
        setIsOpen(false)
  };



  return (
    <Modal centered isOpen={isOpen} size="sm">
      <ModalHeader toggle={() => setIsOpen((v) => !v)}>
        {t("add_size")}
      </ModalHeader>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{size:"",price:""}}
      >
        {(formik) => (
          <Form>
            <ModalBody>
              <SizeForm
            
              />
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={() => setIsOpen(false)}
                color="danger"
              >
                {t("cancel")}
              </Button>
              <Button
                type="submit"
                color="primary"
              >
                {t("add")}
              </Button>
            </ModalFooter>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddCatModal;
