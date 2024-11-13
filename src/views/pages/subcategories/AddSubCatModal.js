import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button } from "reactstrap";
import { useTranslation } from "utility/language";
import { LoadingButton } from "components/input/LoadingButton";
import { useAddSubCategory } from "api/subcategories";
import SubCategoryForm from "./SubCategoryForm";
import { Formik, Form } from "formik";
import { useImagePreview } from "hooks";

import {
  getDataToSend,
  getInitialValues,
  getValidationSchema,
} from "./formUtils";

const AddSubCatModal = ({ isOpen, setIsOpen }) => {
  const t = useTranslation();
  const { mutate: addSubCategory, isLoading, isSuccess } = useAddSubCategory();
  const { preview, handleImageChange, setPreview } = useImagePreview(null);

  const handleSubmit = (values) => {
    addSubCategory(getDataToSend(values));
  };

  React.useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
      setPreview(null);
    }
  }, [isSuccess, setPreview, setIsOpen]);

  return (
    <Modal centered isOpen={isOpen} size="lg">
      <ModalHeader toggle={() => setIsOpen((v) => !v)}>
        {t("add_subcategory")}
      </ModalHeader>
      <Formik
        onSubmit={handleSubmit}
        initialValues={getInitialValues()}
        validationSchema={getValidationSchema()}
      >
        {(formik) => (
          <Form>
            <ModalBody>
              <SubCategoryForm
                preview={preview}
                handleImageChange={handleImageChange}
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

export default AddSubCatModal;
