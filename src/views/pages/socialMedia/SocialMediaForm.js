import React from "react";
import { ValidatedField } from "components/input/ValidatedField";
import { useTranslation } from "utility/language";
import { useFormikContext } from "formik";
import Checkbox from "components/@vuexy/checkbox/CheckboxesVuexy";
import { Check } from "react-feather";
import ImagePreview from "components/ImagePreview";

const SocialMediaForm = ({
    editMode = false,
    img_preview,
    img_handleImageChange
}) => {
    const t = useTranslation();
    const formik = useFormikContext();

    return (
        <>
            <ValidatedField
                name="social_media_link"
                label={t("social_media_link")}
                placeholder={t("social_media_link")}
                required
            />
            <ValidatedField
                id="social_media_image"
                name="social_media_image"
                type="file"
                label={t("social_media_image")}
                placeholder={t("social_media_image")}
                accept="image/*"
                onChange={(e) => {
                    img_handleImageChange(e);
                    formik.setFieldValue(
                        "social_media_image",
                        e.target.files[0]
                    );
                }}
                required={editMode ? false : true}
            />
            <ImagePreview preview={img_preview} />
            <Checkbox
                color="primary"
                icon={<Check className="vx-icon" size={16} />}
                label={t("is_active")}
                checked={formik.values.is_active}
                onChange={() => {
                    formik.setFieldValue("is_active", !formik.values.is_active)
                }
                }
            />
     
        </>
    );
};

export default SocialMediaForm;
