import React from "react";
import { Row, Col } from "reactstrap";
import { ValidatedField } from "components/input/ValidatedField";
import { useTranslation } from "utility/language";
import { useFormikContext } from "formik";
import ImagePreview from "components/ImagePreview";
import { useImagePreview } from "hooks";

import Checkbox from "components/@vuexy/checkbox/CheckboxesVuexy";
import { Check } from "react-feather";

const DetailsForm = ({ editMode = false }) => {
  const t = useTranslation();
  const formik = useFormikContext();
  const { preview, handleImageChange } = useImagePreview(
    formik.values.auction_main_image_preview || null
  );


  return (
    <>
      <Row className="mb-1" xs={1} sm={1} md={1} lg={2} xl={2}>

        <Col lg={5} xl={5}>
          <ValidatedField
            id="auction_main_image"
            type="file"
            label={t("auction_main_image")}
            name="auction_main_image"
            accept="image/*"
            onChange={(e) => {
              handleImageChange(e);
              formik.setFieldValue("auction_main_image", e.target.files[0]);
            }}
            isRequired={editMode ? false : true}
          />
          <ImagePreview height={300} preview={preview} />
        </Col>
        <Col lg={7} xl={7}>
          <ValidatedField

            name="auction_starting_price"
            label={t("starting_price")}
            placeholder={t("starting_price")}
            type="number"
            isRequired={true}

          />

          <ValidatedField

            name="start_at"
            label={t("start_at")}
            placeholder={t("start_at")}
            type="datetime-local"
            isRequired={true}
          />
          <ValidatedField

            name="end_at"
            label={t("end_at")}
            placeholder={t("end_at")}
            type="datetime-local"
            isRequired={true}

          />

          <ValidatedField
            name="auction_sort"
            label={t("auction_sort")}
            placeholder={t("auction_sort")}
            type="number"
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
