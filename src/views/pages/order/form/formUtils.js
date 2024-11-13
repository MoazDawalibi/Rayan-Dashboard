import * as Yup from "yup";
import { buildFormData } from "api/helpers";

export const getInitialValues = (objectToEdit = null) => {
  if (!objectToEdit) {
    return { 
      driver_name:"",
      driver_id_number: "",
      driver_car_back_side:""
    };
  }

  return {
      driver_name:objectToEdit.driver_name,
      driver_id_number: objectToEdit.driver_id_numbert,
      customer_image: "",
      driver_car_back_side:""
      
  };
};

export const getValidationSchema = (editMode = false) => {
  return Yup.object().shape({
    customer_name:Yup.string().required("required"),
    driver_id_number: Yup.number().required("required"),
    
    

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
export const selectFailGender = [
  {value : "female" , label:"female"},
  {value:"male" , label:"male"}
] 


export const  ChangePointShape = (array_of_points)=>{
  let my_new_array = [];

  for (let index = 0; index < array_of_points.length; index+=5) {
    const my_latlong =(array_of_points[index]).split(',') 
      my_new_array.push({
        lat:+ my_latlong[0],
        lng:+my_latlong[1]
      })
    
  }
  return my_new_array ;
}