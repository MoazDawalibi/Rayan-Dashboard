import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button } from "reactstrap";
import { useTranslation } from "utility/language";
import { LoadingButton } from "components/input/LoadingButton";
import { Formik, Form } from "formik";
import { useImagePreview } from "hooks";
import { baseURL } from "api/config";
import { buildFormData } from "api/helpers";
import { useUpdateSocialMedia } from "api/socialMedia";
import SocialMediaForm from "./SocialMediaForm";
import * as Yup from "yup";
import { linkValidation } from "helpers/valdation/link";

const getInitialValues = (objectToEdit) => ({
  social_media_link: objectToEdit.social_media_link || "",
  is_active: objectToEdit.is_active,
  social_media_sort: objectToEdit.social_media_sort || 1,
});

const validationSchema = Yup.object().shape({
  social_media_link: linkValidation,
});

const EditSocialMediaModal = ({
  isOpen,
  setIsOpen,
  objectToEdit,
  setObjectToEdit,
}) => {
  const t = useTranslation();

  const updateMutation = useUpdateSocialMedia();
  const image = objectToEdit?.social_media_image;

  const {
    preview: img_preview,
    handleImageChange: img_handleImageChange,
    setPreview: img_set_preview,
  } = useImagePreview(image);
  const handleSubmit = (values) => {
    const data = { ...values, social_media_id: objectToEdit.id };
    const image = data.social_media_image === "";
    if (image) delete data["social_media_image"];
    const formData = new FormData();
    buildFormData(formData, data);
    updateMutation.mutate(formData);
  };

  React.useEffect(() => {
    if (updateMutation.isSuccess) {
      setIsOpen(false);
    }
  }, [updateMutation.isSuccess, setIsOpen]);
  React.useEffect(() => {
    if (isOpen) {
      img_set_preview(`${baseURL}${image}`);
    }
  }, [isOpen, image, img_set_preview]);

  return (
    <Modal centered isOpen={isOpen} size="lg">
      <ModalHeader toggle={() => setIsOpen((v) => !v)}>
        {t("edit_social_media")}
      </ModalHeader>
      {objectToEdit && (
        <Formik
          onSubmit={handleSubmit}
          initialValues={getInitialValues(objectToEdit)}
          validationSchema={validationSchema}
        >
          {(formik) => (
            <Form>
              <ModalBody>
                <SocialMediaForm
                  img_preview={img_preview}
                  img_handleImageChange={img_handleImageChange}
                  editMode={true}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  disabled={updateMutation.isLoading}
                  onClick={() => setIsOpen(false)}
                  color="danger"
                >
                  {t("cancel")}
                </Button>
                <LoadingButton
                  type="submit"
                  color="primary"
                  isLoading={updateMutation.isLoading}
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

export default EditSocialMediaModal;
