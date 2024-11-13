import React from "react";
import { ValidatedField } from "components/input/ValidatedField";
import { SelectField } from "components/input/SelectField";
import { useTranslation } from "utility/language";
import { useFormikContext } from "formik";
import useCategoryOptions from "utility/selectionOptions/useCategoryOptions";
import ImagePreview from "components/ImagePreview";
import { Row, Col } from "reactstrap";

const SubCategoryForm = ({ preview, handleImageChange, editMode = false }) => {
  const t = useTranslation();
  const formik = useFormikContext();
  const categoriesOptions = useCategoryOptions();

  return (
    <Row xs={1} sm={1} md={1} lg={2} xl={2}>
      <Col>
        <ValidatedField
          dir="ltr"
          name="translated_fields[1][subcategory_name]"
          label={`${t("subcategory_name")} (${t("en")})`}
          placeholder={`${t("subcategory_name")} (${t("en")})`}
          required
        />
        <ValidatedField
          dir="rtl"
          name="translated_fields[2][subcategory_name]"
          label={`${t("subcategory_name")} (${t("ar")})`}
          placeholder={`${t("subcategory_name")} (${t("ar")})`}
          required
        />
        <SelectField
          label={t("category")}
          options={categoriesOptions}
          name="category_id"
          onChange={(opt) => {
            
            formik.setFieldValue("category_id", opt.value);
          }}
          required
        />
        <ValidatedField
          name="subcategory_sort"
          label={t("sort")}
          placeholder={t("sort")}
          type="number"
          required
        />
      </Col>
      <Col>
        <ValidatedField
          id="subcategory_image"
          type="file"
          label={t("subcategory_image")}
          name="subcategory_image"
          accept="image/*"
          onChange={(e) => {
            handleImageChange(e);
            formik.setFieldValue("subcategory_image", e.target.files[0]);
          }}
        />
        <ImagePreview preview={preview} />
      </Col>
    </Row>
  );
};

export default SubCategoryForm;
