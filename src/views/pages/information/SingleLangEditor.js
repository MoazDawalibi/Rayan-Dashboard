import React from "react";
import PropTypes from "prop-types";
import { HtmlEditor } from "extensions/Editor/HtmlEditor";
import { useFormikContext } from "formik";
import { useTranslation } from "utility/language";

const PROPERTY_TYPES = [
  "privacy_description",
  "conditions_description",
  "about_us_description",
  "product_description",
  "auction_description"
];

const SingleLangEditor = ({ langCode, property,props }) => {
  const formik = useFormikContext();
  const t = useTranslation();

  const label = `${t(property)} (${t(`lang_${langCode}`)})`;
  const fieldName = `translated_fields[${langCode}][${property}]`;
  return (
    <>
      <h5>{label}</h5>
      <HtmlEditor
      langCode={langCode}
      {...props}
        name={fieldName}
        editorState={formik.values.translated_fields[langCode][property]}
      />
    </>
  );
};

SingleLangEditor.propTypes = {
  langCode: PropTypes.oneOf([1, 2]).isRequired,
  property: PropTypes.oneOf(PROPERTY_TYPES).isRequired,
};

export default SingleLangEditor;
