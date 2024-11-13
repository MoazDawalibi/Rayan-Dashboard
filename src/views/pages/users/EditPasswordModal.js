import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button } from "reactstrap";
import { useTranslation } from "utility/language";
import { LoadingButton } from "components/input/LoadingButton";
import { useUpdateUserPassword } from "api/users";
import { Formik, Form } from "formik";
import ChangePassword, {
  initialValues,
  validationSchema,
} from "components/forms/ChangePassword";

const EditPasswordModal = ({
  isOpen,
  setIsOpen,
  objectToEdit,
  setObjectToEdit,
}) => {
  const t = useTranslation();
  const updateMutation = useUpdateUserPassword();

  const handleSubmit = (values) => {
    updateMutation.mutate({ ...values, user_id: objectToEdit.id });
  };

  React.useEffect(() => {
    if (updateMutation.isSuccess) {
      setIsOpen(false);
    }
  }, [updateMutation.isSuccess, setIsOpen]);

  return (
    <Modal centered isOpen={isOpen} size="md">
      <ModalHeader>{t("change_password")}</ModalHeader>
      {objectToEdit && (
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {(formik) => (
            <Form>
              <ModalBody>
                <div>
                  <h6>{objectToEdit?.full_name}</h6>
                </div>
                <ChangePassword />
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

export default EditPasswordModal;
