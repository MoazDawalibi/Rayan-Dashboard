  import * as Yup from "yup";
import { buildFormData } from "api/helpers";

export const getInitialValues = (objectToEdit = null) => {
  if (!objectToEdit) {
    return {
      code_number:"",
      code_value:"",
   
      
    };
  }

  return {
    code_value:objectToEdit.code_value ,
    code_status:objectToEdit.code_status,

      
  };
};

export const getValidationSchema = (editMode = false) => {
  return Yup.object().shape({
    code_value:Yup.number().required("required"),
    code_number:Yup.number().positive("Positive Only").required("required")
  });
};

export const getDataToSend = (values) => {
  const data = { ...values };
  const formData = new FormData();
  buildFormData(formData, data);
  return formData;
};

export const ChangeDataToPrint = (data)=>{

  let new_array = data
  for(let i =0 ; i<data.length ; i++){
    new_array[i]['status'] =!data[i]['deleted_at'] ?'available':'unavailable'
    delete new_array[i]['deleted_at']
  }
  return new_array
}