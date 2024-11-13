import * as Yup from "yup";
import { mapTranslatedProperties } from "helpers/language";
import { buildFormData } from "api/helpers";

export const getInitialValues = (objectToEdit = null) => {
  if (!objectToEdit) {
    return {
      translated_fields: {
        1: {
          subcategory_name: "",
        },
        2: {
          subcategory_name: "",
        },
      },
      subcategory_image: "",
      category_id: "",
      subcategory_sort: 1,
    };
  }

  return {
    translated_fields: {
      1: {
        subcategory_name:
          mapTranslatedProperties(
            objectToEdit?.subcategory_details,
            "subcategory_name",
            1
          ) || "",
      },
      2: {
        subcategory_name:
          mapTranslatedProperties(
            objectToEdit?.subcategory_details,
            "subcategory_name",
            2
          ) || "",
      },
    },
    subcategory_image: "",
    category_id: objectToEdit.category_id ?? "",
    subcategory_sort: objectToEdit.subcategory_sort ?? 1,
  };
};

export const getValidationSchema = (editMode = false) => {
  return Yup.object().shape({
    translated_fields: Yup.object({
      1: Yup.object({
        subcategory_name: Yup.string().required("required"),
      }),
      2: Yup.object({
        subcategory_name: Yup.string().required("required"),
      }),
    }),
    category_id: Yup.number().required("required"),

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
