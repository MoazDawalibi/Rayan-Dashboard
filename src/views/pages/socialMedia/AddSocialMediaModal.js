import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button } from "reactstrap";
import { useTranslation } from "utility/language";
import { LoadingButton } from "components/input/LoadingButton";
import SocialMediaForm from "./SocialMediaForm";
import { Formik, Form } from "formik";
import { buildFormData } from "api/helpers";
import { useImagePreview } from "hooks";
import * as Yup from "yup";
import { useAddSocialMedia } from "api/socialMedia";
import { linkValidation } from "helpers/valdation/link";

const initialValues = {
  social_media_link: "",
  social_media_image: "",
  is_active: true,
  social_media_sort: 1,
};

const validationSchema = Yup.object().shape({
  social_media_link: linkValidation,
  social_media_image: Yup.mixed().required("please_fill_out_this_feild"),
});

const AddSocialMediaModal = ({ isOpen, setIsOpen }) => {
  const t = useTranslation();

  const addMutation = useAddSocialMedia();
  const {
    preview: img_preview,
    handleImageChange: img_handleImageChange,
    setPreview: img_setPreview,
  } = useImagePreview(null);

  const handleSubmit = (values) => {
    const formData = new FormData();
    buildFormData(formData, values);
    addMutation.mutate(formData);
  };

  React.useEffect(() => {
    if (addMutation.isSuccess) {
      setIsOpen(false);
      img_setPreview(null);
    }
  }, [addMutation.isSuccess, setIsOpen, img_setPreview]);

  return (
    <Modal centered isOpen={isOpen} size="lg">
      <ModalHeader toggle={() => setIsOpen((v) => !v)}>
        {t("add_social_media")}
      </ModalHeader>
      <Formik
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        {(formik) => (
          <Form>
            <ModalBody>
              <SocialMediaForm
                img_preview={img_preview}
                img_handleImageChange={img_handleImageChange}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                disabled={addMutation.isLoading}
                onClick={() => setIsOpen(false)}
                color="danger"
              >
                {t("cancel")}
              </Button>
              <LoadingButton
                type="submit"
                color="primary"
                isLoading={addMutation.isLoading}
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

export default AddSocialMediaModal;
