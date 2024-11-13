import * as Yup from "yup";
import { mapTranslatedProperties } from "helpers/language";
import { buildFormData } from "api/helpers";
import { useTranslation } from "utility/language";

export const getInitialValues = (objectToEdit = null) => {

  if (!objectToEdit) {
    return {
      setting_name:"",
      setting_value:""
    };
  }

  return {
    setting_name:objectToEdit.title ,
    setting_value:objectToEdit.value ,
    is_percentage:objectToEdit.is_percentage??false,
    setting_key:objectToEdit.key
  };
};

export const getValidationSchema = (editMode = false) => {
  return Yup.object().shape({
    setting_name:Yup.string().required("required"),
    setting_value:Yup.number().required("required"),
 
  });
};

export const getDataToSend = (values) => {
  const data = { ...values };
  const formData = new FormData();
  buildFormData(formData, data);
  return formData;
};

export const check_key_id_precent= (string) => {
  if(string ==='driver_profit_ratio' ||string ==='customer_profit_ratio' ||
  string === 'نسبة الخصم للتحويل بين المحافظ' || 
  string ==='The_cost_of_opening_the_door' ||
  string ==='profit_percentage' ){
    return true 
  }
  return false 
}