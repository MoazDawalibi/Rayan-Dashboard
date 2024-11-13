import * as Yup from "yup";
import { buildFormData } from "api/helpers";
import { baseURL } from "api/config";

export const getInitialValues = (objectToEdit) => {
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
      driver_name:objectToEdit?.full_name??'',
      code: objectToEdit?.code??'',
      driver_image: objectToEdit?.avatar??'',
      driver_birthday:objectToEdit?.birthday??'',
      driver_phone:objectToEdit?.phone??'',
      driver_city:objectToEdit?.city?.google_short_name??'',
      driver_gender:objectToEdit?.gender??'',
      driver_wallet:objectToEdit?.wallet??'' ,
      license_id:objectToEdit?.licenseID ??'',
      nationality_id:objectToEdit?.nationalityID??'',
      residential_card_number:objectToEdit?.residential_card_number??'',
      yearly_id:objectToEdit?.yearlyID??'',
      car_type:objectToEdit?.car_type??'',
      car_seat_count:objectToEdit?.car_seat_count??'',
      car_color:objectToEdit?.car_color??'',
      car_model:objectToEdit?.car_model??'' ,
      driver_image1: objectToEdit?.images[0]?.media_path??'',
      driver_image2: objectToEdit?.images[1]?.media_path??'',
      driver_image3: objectToEdit?.images[2]?.media_path??'',
      driver_image4: objectToEdit?.images[3]?.media_path??'',
      driver_image5: objectToEdit?.images[4]?.media_path??'',
      driver_image6: objectToEdit?.images[5]?.media_path??'',
      driver_image7: objectToEdit?.images[6]?.media_path??'',
      driver_image8: objectToEdit?.images[7]?.media_path??'',
      driver_image9: objectToEdit?.images[8]?.media_path??'',
      driver_image10: objectToEdit?.images[9]?.media_path??'',
      driver_image11: objectToEdit?.images[10]?.media_path??'',
      driver_image12: objectToEdit?.images[11]?.media_path??'',
      driver_image13: objectToEdit?.images[12]?.media_path??'',
      created_at:formattedDate

      
  };
};

export const getValidationSchema = (editMode = false) => {
  return Yup.object().shape({
      

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
  {value : "Female" , label:"female"},
  {value:"Male" , label:"male"}
] 


export const change_values_shap = (object)=>{

 const new_array = []


    console.log(object);
  for(const opt in object){
    if(opt.includes('driver_image') && opt != 'driver_image'){
      console.log("IMAGES ",object[opt]);
      new_array.push(object[opt])
    }
  }
  return  new_array 
  

}