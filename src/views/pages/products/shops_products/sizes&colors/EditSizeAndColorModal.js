import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button } from "reactstrap";
import { useTranslation } from "utility/language";
import { LoadingButton } from "components/input/LoadingButton";
import CategoryForm from "./ColorAndSizeForm";
import { Formik, Form } from "formik";


import {
  getInitialValues,
  getValidationSchema,
} from "./formUtils";
import { useUpdateProductVariation } from "api/shops_products";

const EditSizeAndColorModal = ({ isOpen, setIsOpen, objectToEdit, setObjectToEdit,product_id }) => {
  const t = useTranslation();
  const { mutate: updateVariation, isLoading, isSuccess } = useUpdateProductVariation();



  const handleSubmit = (values) => {
    updateVariation({ ...values, variation_id: objectToEdit.id,product_id:product_id });
  };

  React.useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
    }
  }, [isSuccess, setIsOpen]);


  return (
    <Modal centered isOpen={isOpen} size="lg">
      <ModalHeader toggle={() => setIsOpen((v) => !v)}>
        {`${t("edit")}${t("sizes&colors")}`}
      </ModalHeader>
      {objectToEdit && (
        <Formik
          onSubmit={handleSubmit}
          initialValues={getInitialValues(objectToEdit)}
          validationSchema={getValidationSchema(true)}
        >
          {(formik) => (
            <Form>
              <ModalBody>
                <CategoryForm
                  editMode={true}
           
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
                  {t("save")}
                </LoadingButton>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      )}
    </Modal>
  );
};

export default EditSizeAndColorModal;
