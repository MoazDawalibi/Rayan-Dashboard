import * as Yup from "yup";
import { mapTranslatedProperties } from "helpers/language";
import { buildFormData } from "api/helpers";

export const getInitialValues = (objectToEdit = null) => {
  if (!objectToEdit) {
    return {
      translated_fields: {
        1: {
          category_name: "",
        },
        2: {
          category_name: "",
        },
      },
      category_image: "",
      category_sort: 1,
    };
  }

  return {
    translated_fields: {
      1: {
        category_name:
          mapTranslatedProperties(
            objectToEdit?.category_details,
            "category_name",
            1
          ) || "",
      },
      2: {
        category_name:
          mapTranslatedProperties(
            objectToEdit?.category_details,
            "category_name",
            2
          ) || "",
      },
    },
    category_image: "",
    category_sort: objectToEdit.category_sort ?? 1,
  };
};

export const getValidationSchema = (editMode = false) => {
  return Yup.object().shape({
    translated_fields: Yup.object({
      1: Yup.object({
        category_name: Yup.string().required("required"),
      }),
      2: Yup.object({
        category_name: Yup.string().required("required"),
      }),
    }),

    ...(!editMode && {
      category_image: Yup.mixed().required("required"),
    }),
  });
};

export const getDataToSend = (values) => {
  const data = { ...values };
  if (values.image === "") {
    delete data["category_image"];
  }
  const formData = new FormData();
  buildFormData(formData, data);
  return formData;
};
