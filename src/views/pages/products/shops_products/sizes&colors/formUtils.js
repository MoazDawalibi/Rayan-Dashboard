import * as Yup from "yup";

export const getInitialValues = (objectToEdit = null) => {
  if (!objectToEdit) {
    return {
      size_id:"",
      color_id:"",
      quantity:"",
      price:"",


    };
  }

  return {
    size_id:objectToEdit?.size_id || "",
      color_id:objectToEdit?.color_id || "",
      quantity:objectToEdit?.quantity || "",
      price:objectToEdit?.price || "",
   
  };
};

export const getValidationSchema = (editMode = false) => {
  return Yup.object().shape({
    quantity:Yup.number().required("required"),
    price:Yup.number().when("size_id",{
      is:size_id=>size_id,
      then:Yup.number().required("required")
    }
    ),
    size_id:Yup.string().when("color_id",{
      is:(color_id)=>!color_id,
      then:Yup.string().required("validation.size_and_color")
    }),

  
  });
};
export const getDataToSend=(values)=>{
  const data={...values};
  if(values.size_id===""){

    delete data["size_id"]
    delete data["price"]
  }
  if(values.color_id==="")
  delete data["color_id"]
  return data

}

