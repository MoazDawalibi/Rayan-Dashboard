import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button } from "reactstrap";
import { useTranslation } from "utility/language";
import { LoadingButton } from "components/input/LoadingButton";
import CategoryForm from "./SettingForm";
import { Formik, Form } from "formik";

import {
  getInitialValues,
  getValidationSchema,
  getDataToSend,
} from "./formUtils";
import { useUpdateSetting } from "api/app_setting";

const EditSetModal = ({ isOpen, setIsOpen, objectToEdit, setObjectToEdit }) => {
  const t = useTranslation();
  const { mutate: updateSetting, isLoading, isSuccess } = useUpdateSetting();

  const handleSubmit = (values) => {
 
    console.log(values);
    updateSetting({
      key:values.setting_key,
      value:`${values.setting_value}`,
      setting_id:objectToEdit.id,
      title:values.setting_name,
      is_percentage:values?.is_percentage
     });
  };

  React.useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
    }
  }, [isSuccess, setIsOpen]);


  return (
    <Modal centered isOpen={isOpen} size="lg">
      <ModalHeader toggle={() => setIsOpen((v) => !v)}>
        {t("edit_setting")}
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
                  edit={objectToEdit}
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

export default EditSetModal;
