import * as Yup from "yup";
import { buildFormData } from "api/helpers";

export const getInitialValues = (objectToEdit = null) => {
  if (!objectToEdit) {
    return { 
     
      customer_name:"",
      customer_email:"",
      customer_id_number: "",
      created_at:""
     
    };
  }

  const date = new Date(objectToEdit?.created_at)
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;
  return {
      customer_name:objectToEdit.full_name,
      customer_code:objectToEdit.code,
      customer_phone: objectToEdit.phone,
      customer_image: objectToEdit.avatar,
      customer_wallet: objectToEdit.wallet,
      customer_city:objectToEdit.city?.google_short_name,
      created_at: formattedDate
  };
};

export const getValidationSchema = (editMode = false) => {
  return Yup.object().shape({
    customer_name:Yup.string().required("required"),
    customer_email:Yup.string().email().required("required"),
    customer_id_number: Yup.number().required("required"),
    

    ...(!editMode && {
      subcategory_image: Yup.mixed().required("required"),
    }),
  });
};

export const getDataToSend = (values) => {
  const data = { ...values };
  if (values.subcategory_image === "") {
    delete data["subcategory_image"];
  }
  const formData = new FormData();
  buildFormData(formData, data);
  return formData;
};
