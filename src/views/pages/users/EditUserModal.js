import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button } from "reactstrap";
import { useTranslation } from "utility/language";
import { LoadingButton } from "components/input/LoadingButton";
import { useUpdateUser } from "api/users";
import { Formik, Form } from "formik";
import UserForm from "./UserForm";

const getInitialValues = (objectToEdit) => ({
  full_name: objectToEdit?.full_name,
  email: objectToEdit.email,
  phone: objectToEdit.phone,
  is_verified: objectToEdit.is_verified,
  vendor_id: objectToEdit.vendor_id,
});

const EditUserModal = ({
  isOpen,
  setIsOpen,
  objectToEdit,
  setObjectToEdit,
}) => {
  const t = useTranslation();
  const updateMutation = useUpdateUser();

  const handleSubmit = (values) => {
    updateMutation.mutate({ ...values, user_id: objectToEdit.id });
  };

  React.useEffect(() => {
    if (updateMutation.isSuccess) {
      setIsOpen(false);
    }
  }, [updateMutation.isSuccess, setIsOpen]);

  return (
    <Modal centered isOpen={isOpen} size="lg">
      <ModalHeader>{t("edit_user")}</ModalHeader>
      {objectToEdit && (
        <Formik
          onSubmit={handleSubmit}
          initialValues={getInitialValues(objectToEdit)}
        >
          {(formik) => (
            <Form>
              <ModalBody>
                <UserForm />
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

export default EditUserModal;
