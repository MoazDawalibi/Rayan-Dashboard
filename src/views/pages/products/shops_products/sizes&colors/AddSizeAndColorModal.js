import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button } from "reactstrap";
import { useTranslation } from "utility/language";
import { LoadingButton } from "components/input/LoadingButton";
import { useAddProductVariation } from "api/shops_products";
import CategoryForm from "./ColorAndSizeForm";
import { Formik, Form } from "formik";

import {
  getInitialValues,
  getValidationSchema,
  getDataToSend
} from "./formUtils";

const AddSizeAndColorModal = ({ isOpen, setIsOpen,product_id }) => {
  const t = useTranslation();
  const { mutate: addVariation, isSuccess, isLoading } = useAddProductVariation();

  const handleSubmit = (values) => {
    addVariation(getDataToSend({...values,product_id:product_id}));
  };

  React.useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
    }
  }, [isSuccess,  setIsOpen]);

  return (
    <Modal centered isOpen={isOpen} size="lg">
      <ModalHeader toggle={() => setIsOpen((v) => !v)}>
      {`${t("add")}${t("sizes&colors")}`}
      </ModalHeader>
      <Formik
        onSubmit={handleSubmit}
        initialValues={getInitialValues()}
        validationSchema={getValidationSchema()}
      >
        {(formik) => (
          <Form>
            <ModalBody>
              <CategoryForm
             
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

export default AddSizeAndColorModal;
