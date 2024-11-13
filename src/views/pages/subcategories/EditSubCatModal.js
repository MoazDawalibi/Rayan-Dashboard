import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button } from "reactstrap";
import { useTranslation } from "utility/language";
import { LoadingButton } from "components/input/LoadingButton";
import { useUpdateSubCategory } from "api/subcategories";
import SubCategoryForm from "./SubCategoryForm";
import { Formik, Form } from "formik";
import { useImagePreview } from "hooks";
import { baseURL } from "api/config";

import {
  getInitialValues,
  getValidationSchema,
  getDataToSend,
} from "./formUtils";

const EditSubCatModal = ({
  isOpen,
  setIsOpen,
  objectToEdit,
  setObjectToEdit,
}) => {
  const t = useTranslation();
  const {
    mutate: updateSubCategory,
    isLoading,  
    isSuccess,
  } = useUpdateSubCategory();

  const subcategory_image = objectToEdit?.subcategory_image;
  const { preview, handleImageChange, setPreview } =
    useImagePreview(subcategory_image);

  const handleSubmit = (values) => {
    updateSubCategory(
      getDataToSend({ ...values, subcategory_id: objectToEdit.id })
    );
  };

  React.useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
    }
  }, [isSuccess, setIsOpen]);
  React.useEffect(() => {
    if (isOpen) {
      setPreview(`${baseURL}${subcategory_image}`);
    }
  }, [isOpen, setPreview, subcategory_image]);

  return (
    <Modal centered isOpen={isOpen} size="lg">
      <ModalHeader toggle={() => setIsOpen((v) => !v)}>
        {t("edit_subcategory")}
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
                <SubCategoryForm
                  editMode={true}
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

export default EditSubCatModal;
