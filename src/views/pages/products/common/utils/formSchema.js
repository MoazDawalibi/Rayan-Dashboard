import * as Yup from "yup";
import { mapTranslatedProperties } from "helpers/language";
import { baseURL } from "api/config";
import { link_regex } from "helpers/valdation/link";

import { TYPE } from "../useProductType";


export const getInitialValues = (productType, objectToEdit = null) => {
  if (!objectToEdit) {
    let selections = {};
    if (productType === TYPE.OWNER_PRODUCT) {
      selections = {
        category_id: "",
        subcategory_id: "",
      };
    } else if (productType === TYPE.SHOP_PRODUCT) {
      selections = {
        shop_id: "",
        shop_category_id:"",
      };
    }
    return {
      //Language Based Fields
      translated_fields: {
        1: {
          product_name: "",
          product_description: "",
          product_mobile_description: "",
        },
        2: {
          product_name: "",
          product_description: "",
          product_mobile_description: "",
        },
      },

      ...selections,

      //Details
      discount_id: "",
      product_status_id: 1,
      product_quantity: "",
      product_main_image: "",
      product_sort: 1,
      product_price: "",
      product_video_link: "",
      is_highlight: false,
      is_active: true,
      // colors:[],
      // sizes:[],

      //Additional Images
      product_additional_images: [],
    };
  }

  let selections = {};
  if (productType === TYPE.OWNER_PRODUCT) {
    selections = {
      category_id: objectToEdit?.subcategory?.category_id || "",
      subcategory_id: objectToEdit?.subcategory_id || "",
    };
  } else if (productType === TYPE.SHOP_PRODUCT) {
    selections = {
      shop_id: objectToEdit?.shop_id || "",
      shop_category_id:objectToEdit?.shop_category_id || "",
    };
  }

  // let array=objectToEdit?.colors.map(ele=>ele.id) || [];
  return {
    //Language Based Fields
    translated_fields: {
      1: {
        product_name:
          mapTranslatedProperties(
            objectToEdit.product_details,
            "product_name",
            1
          ) || "",
        product_description:
          mapTranslatedProperties(
            objectToEdit.product_details,
            "product_description",
            1
          ) || "",
    
        product_mobile_description:
          mapTranslatedProperties(
            objectToEdit.product_details,
            "product_mobile_description",
            1
          ) || "",
      },
      2: {
        product_name:
          mapTranslatedProperties(
            objectToEdit.product_details,
            "product_name",
            2
          ) || "",
        product_description:
          mapTranslatedProperties(
            objectToEdit.product_details,
            "product_description",
            2
          ) || "",

        product_mobile_description:
          mapTranslatedProperties(
            objectToEdit.product_details,
            "product_mobile_description",
            2
          ) || "",
      },
    },

    ...selections,

    //Details
    discount_id: objectToEdit.discount_id ?? "",
    product_status_id: objectToEdit.product_status_id ?? "",
    product_quantity: objectToEdit.product_quantity ?? "",
    product_main_image: "",
    // colors:array,
    // sizes:objectToEdit?.sizes || [],
    product_sort: objectToEdit.product_sort ?? 1,
    product_price: objectToEdit.product_price ?? 0,
    product_video_link: objectToEdit.product_video_link || "",
    is_highlight: objectToEdit.is_highlight ?? false,
    is_active: objectToEdit.is_active ?? false,

    product_main_image_preview: `${baseURL}${objectToEdit.product_main_image}`,
  };
};

export const getValidationSchema = (productType, editMode = false) =>
  Yup.object().shape({
    translated_fields: Yup.object({
      1: Yup.object({
        product_name: Yup.string().required("required"),
      }),
      2: Yup.object({
        product_name: Yup.string().required("required"),
      }),
    }),
    product_status_id: Yup.number().required("required"),
    product_price: Yup.number().required("required"),
    product_quantity: Yup.number().required("required"),

   

    ...(productType === TYPE.OWNER_PRODUCT && {
      category_id: Yup.number().required("required"),
      subcategory_id: Yup.number().required("required"),
    }),
    ...(productType === TYPE.SHOP_PRODUCT && {
      shop_id: Yup.number().required("required"),
      shop_category_id:Yup.number().required("required"),

    }),

    product_video_link: Yup.string().matches(
      link_regex,
      "validation.invalid_link"
    ),

    ...(!editMode && {
      product_main_image: Yup.mixed().required("required"),
    }),
  });

  export const getOwnerDataToExport=(data)=>{

    let newDataArray=[];
    for (let product of data){
            const newData={...product};
            delete newData["product_details"];
            delete newData["product_status"];  
            delete newData["subcategory_id"];  
            delete newData["created_at"];  
            delete newData["created_at"];  
            delete newData["images"];  
            delete newData["shop_id"];  
            delete newData["shop_category_id"];  
            delete newData["discount_id"];  
            delete newData["is_highlight"];  
      
            delete newData["product_sort"];  
            delete newData["product_status_id"];  

            newDataArray.push({
                
              product_name_en:mapTranslatedProperties(product.product_details,
                "product_name",
                1
                
                ),
                product_name_ar:mapTranslatedProperties(product.product_details,
                  "product_name",
                  2
                  
                  ),
                  ...newData,
                  product_main_image:`${baseURL}${newData.product_main_image}`,

                
              product_mobile_description_en:mapTranslatedProperties(product.product_details,
                "product_mobile_description",
                1),
                  
                product_mobile_description_ar:mapTranslatedProperties(product.product_details,
                  "product_mobile_description",
                  2),
                
                
              })
    }
    return newDataArray
  }
  export const getShopDataToExport=(data)=>{

    let newDataArray=[];
    for (let product of data){
            const newData={...product};
            delete newData["product_details"];
            delete newData["product_status"];  
            delete newData["subcategory_id"];  
            delete newData["created_at"];  
            delete newData["created_at"]; 
            delete newData["images"];  
            delete newData["shop_id"];  
            delete newData["shop_category_id"];  
            delete newData["discount_id"];  
            delete newData["is_highlight"];  
            delete newData["product_sort"];  
            delete newData["product_status_id"];
            delete newData["product_variations"];
            delete newData["product_review_avg"];
            delete newData["product_reviews_count"];
            delete newData["product_purchasing_count"];
            let count=1;
            
            for(let variation of product.product_variations){
                newData[`variation_${count}_color_en`]=mapTranslatedProperties(variation?.color?.color_details,
                  "color_name",1)||"---";
                newData[`variation_${count}_color_ar`]=mapTranslatedProperties(variation?.color?.color_details,
                  "color_name",2)||"---";
                newData[`variation_${count}_size_en`]=mapTranslatedProperties(variation?.size?.size_details,
                  "size_name",1)||"---";
                newData[`variation_${count}_size_ar`]=mapTranslatedProperties(variation?.size?.size_details,
                  "size_name",2)||"---";
                newData[`variation_${count}_price`]=variation?.price||"---";
                newData[`variation_${count}_quantity`]=variation?.quantity||"---";
                count=count+1;
            }
      
        

            newDataArray.push({
             
              product_name_en:mapTranslatedProperties(product.product_details,
                "product_name",
                1
                
                ),
                
                
                product_name_ar:mapTranslatedProperties(product.product_details,
                  "product_name",
                  2
                  
                  ),
                  ...newData,
              product_main_image:`${baseURL}${newData.product_main_image}`,

                  
                  product_mobile_description_en:mapTranslatedProperties(product.product_details,
                    "product_mobile_description",
                    1),
                product_mobile_description_ar:mapTranslatedProperties(product.product_details,
                  "product_mobile_description",
                  2),
                  
                
              })
    }
    return newDataArray
  }

