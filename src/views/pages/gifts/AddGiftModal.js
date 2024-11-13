import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button } from "reactstrap";
import { useTranslation } from "utility/language";
import { LoadingButton } from "components/input/LoadingButton";
import { useAddCategory } from "api/categories";
import { Formik, Form } from "formik";


import {
  getInitialValues,
  getValidationSchema,
  getDataToSend,
} from "./FormGift/formUtils";
import GiftAddForm from "./GiftAddForm";


const AddCodModal = ({ isOpen, setIsOpen }) => {
  const t = useTranslation();
  const { mutate: addCategory, isSuccess, isLoading } = useAddCategory();
  const handleSubmit = (values) => {
    addCategory(getDataToSend(values));
  };


  return (
    <Modal centered isOpen={isOpen} size="lg">
      <ModalHeader toggle={() => setIsOpen((v) => !v)}>
        {t("add_gift")}
      </ModalHeader>
      <Formik
        onSubmit={handleSubmit}
        initialValues={getInitialValues()}
        validationSchema={getValidationSchema()}
      >
        {(formik) => (
          <Form>
            <ModalBody>
              <GiftAddForm
              />
            </ModalBody>
            <ModalFooter>
              <Button
                disabled={isLoading}
                onClick={() => setIsOpen(false)}
                color="danger"
              >
                {t("cancel")}
              </Button>
              <LoadingButton
                type="submit"
                color="primary"
                isLoading={isLoading}
              >
                {t("add")}
              </LoadingButton>
            </ModalFooter>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddCodModal;
