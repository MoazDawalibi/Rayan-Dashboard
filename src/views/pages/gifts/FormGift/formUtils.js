import * as Yup from "yup";
import { buildFormData } from "api/helpers";

export const getInitialValues = (objectToEdit = null) => {
  if (!objectToEdit) {
    return {
      gift_value:"",
      gift_name:""
      
    };
  }

  return {
    gift_value:objectToEdit.gift_value,
    gift_name:objectToEdit.gift_name
    
      
  };
};

export const getValidationSchema = (editMode = false) => {
  return Yup.object().shape({
    gift_value:Yup.number().required("required"),
    gift_name:Yup.string().required("required")
  });
};

export const getDataToSend = (values) => {
  const data = { ...values };
  const formData = new FormData();
  buildFormData(formData, data);
  return formData;
};
