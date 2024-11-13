import * as Yup from "yup";
import { buildFormData } from "api/helpers";

export const getInitialValues = () => {
 

  return {
      content:"",
      type:"",
      send_to:"",
      image:"",
      title:"",
      select:""
      
  };
};

export const getValidationSchema = (editMode = false) => {
  return Yup.object().shape({
    content:Yup.string().required("Required"),
    title:Yup.string().required("Required"),
    type: Yup.string().required("Required"),
    send_to: Yup.string().required("Required"),
    code:Yup.string().when('send_to', {
      is: (to)=>{
        return to === "one"  
      },
      then: Yup.string().required('Required'),
      otherwise: Yup.string()
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
export const selectFailGender = [
  {value : "female" , label:"female"},
  {value:"male" , label:"male"}
] 
export const Convert_data_to_select = (array)=>{
  let new_array = []
  for (let index = 0; index < array.length; index++) {
      new_array.push({
        value:array[index].id,
        label:array[index].full_name
      })
    
  }
  return new_array
}
export const get_id_from_array = (array)=>{
  let new_array = [];
  for (let index = 0; index < array.length; index++) {
    new_array.push(array[index].value)
  }
  return new_array
}
