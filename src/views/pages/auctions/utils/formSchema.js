import * as Yup from "yup";
import { mapTranslatedProperties } from "helpers/language";
import { baseURL } from "api/config";
import { formatFromBackend } from "helpers/date";


export const getInitialValues = ( objectToEdit = null) => {
  if (!objectToEdit) {
   
    return {
      //Language Based Fields
      translated_fields: {
        1: {
          auction_name: "",
          auction_description: "",
         auction_mobile_description: "",
        },
        2: {
          auction_name: "",
          auction_description: "",
          auction_mobile_description: "",
        },
      },


      //Details
     
      auction_main_image: "",
      auction_sort: 1,
      start_at:"",
      end_at:"",
      auction_starting_price:0,
      is_highlight: false,
      is_active: true,

      //Additional Images
      auction_additional_images: [],
    };
  }


  return {
    //Language Based Fields
    translated_fields: {
      1: {
        auction_name:
          mapTranslatedProperties(
            objectToEdit.auction_details,
            "auction_name",
            1
          ) || "",
        auction_description:
          mapTranslatedProperties(
            objectToEdit.auction_details,
            "auction_description",
            1
          ) || "",
        auction_mobile_description:
          mapTranslatedProperties(
            objectToEdit.auction_details,
            "auction_mobile_description",
            1
          ) || "",
      },
      2: {
        auction_name:
          mapTranslatedProperties(
            objectToEdit.auction_details,
            "auction_name",
            2
          ) || "",
        auction_description:
          mapTranslatedProperties(
            objectToEdit.auction_details,
            "auction_description",
            2
          ) || "",

        auction_mobile_description:
          mapTranslatedProperties(
            objectToEdit.auction_details,
            "auction_mobile_description",
            2
          ) || "",
      },
    },


    //Details
    start_at: objectToEdit.start_at !== null ? formatFromBackend(objectToEdit?.start_at) : "",
    end_at: objectToEdit.end_at !== null ? formatFromBackend(objectToEdit?.end_at) : "",
    auction_main_image: "",
    auction_sort: objectToEdit.auction_sort ?? 1,
    is_highlight: objectToEdit.is_highlight ?? false,
    is_active: objectToEdit.is_active ?? false,
    auction_starting_price:objectToEdit.auction_starting_price||0,
    auction_main_image_preview: `${baseURL}${objectToEdit.auction_main_image}`,
  };
};

export const getValidationSchema = ( editMode = false) =>
  Yup.object().shape({
    translated_fields: Yup.object({
      1: Yup.object({
       auction_name: Yup.string().required("required"),
      }),
      2: Yup.object({
       auction_name: Yup.string().required("required"),
      }),
    }),
    ...(!editMode && {
     auction_main_image: Yup.mixed().required("required"),
    }),
    start_at: Yup.date().required("required"),
    end_at: Yup.date().min(
        Yup.ref('start_at'),
        "validation.end_at"
    ).required("required"),
    auction_starting_price:Yup.number().required("required")
  });
