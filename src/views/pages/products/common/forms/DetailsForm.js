import React from "react";
import { Row, Col } from "reactstrap";
import { ValidatedField } from "components/input/ValidatedField";
import { useTranslation } from "utility/language";
import { useFormikContext } from "formik";
import ImagePreview from "components/ImagePreview";
import { useImagePreview } from "hooks";
import Checkbox from "components/@vuexy/checkbox/CheckboxesVuexy";
import { Check } from "react-feather";
import SelectionForm from "./SelectionForm";
import { SelectField } from "components/input/SelectField";
// import useProductTypes, { TYPE } from "../useProductType";

import useDefaultCurrency from "utility/currencies/useDefaultCurrency";
import useDiscountOptions from "utility/selectionOptions/useDiscountOptions";
// import Sizes from "./sizes/Sizes";


const DetailsForm = ({ editMode = false }) => {
  const t = useTranslation();
  const formik = useFormikContext();
  const { preview, handleImageChange } = useImagePreview(
    formik.values.product_main_image_preview || null
  );
  const { currencyCode } = useDefaultCurrency();
  const discountOptions = useDiscountOptions();
  // const productType = useProductTypes();


  return (
    <>
      <Row className="mb-1" xs={1} sm={1} md={1} lg={2} xl={2}>
        <Col lg={7} xl={7}>
          <SelectionForm  />


          <ValidatedField
            name="product_quantity"
            label={t("product_quantity")}
            placeholder={t("product_quantity")}
            type="number"
            isRequired
          />
          <Row className="align-items-center" xs={2}>
            <Col xs={10}>
              <ValidatedField
                name="product_price"
                label={t("product_price")}
                placeholder={t("product_price")}
                type="number"
                isRequired
              />
            </Col>
            <Col xs={2}>
              <h4>{currencyCode}</h4>
            </Col>
          </Row>
          <SelectField
            label={t("discount")}
            options={discountOptions}
            name="discount_id"
            onChange={(opt) => {
              formik.setFieldValue("discount_id", opt.value);
            }}
          />
        </Col>
        <Col lg={5} xl={5}>
          <ValidatedField
            id="product_main_image"
            type="file"
            label={t("product_main_image")}
            name="product_main_image"
            accept="image/*"
            onChange={(e) => {
              handleImageChange(e);
              formik.setFieldValue("product_main_image", e.target.files[0]);
            }}
            isRequired={editMode ? false : true}
          />
          <ImagePreview height={300} preview={preview} />
          {/* {
              productType === TYPE.SHOP_PRODUCT&&<Sizes sizes={formik.values.sizes}/>
          } */}
            
        </Col>
      </Row>
      <Row xs={1} sm={1} md={2} lg={2} xl={2}>
        <Col xs={12} sm={12} md={2} lg={2} xl={2}>
          <ValidatedField
            name="product_sort"
            label={t("product_sort")}
            placeholder={t("product_sort")}
            type="number"
          />
        </Col>
        <Col xs={12} sm={12} md={10} lg={10} xl={10}>
          <ValidatedField
            name="product_video_link"
            label={t("product_video_link")}
            placeholder={t("product_video_link")}
          />
        </Col>
      </Row>
      <Row className="mb-1">
        <Col>
          <Checkbox
            color="primary"
            icon={<Check className="vx-icon" size={16} />}
            label={t("is_active")}
            checked={formik.values.is_active}
            onChange={() =>
              formik.setFieldValue("is_active", !formik.values.is_active)
            }
          />
        </Col>
        <Col>
          <Checkbox
            color="primary"
            icon={<Check className="vx-icon" size={16} />}
            label={t("is_highlight")}
            checked={formik.values.is_highlight}
            onChange={() =>
              formik.setFieldValue("is_highlight", !formik.values.is_highlight)
            }
          />
        </Col>
      </Row>
    </>
  );
};

export default DetailsForm;
