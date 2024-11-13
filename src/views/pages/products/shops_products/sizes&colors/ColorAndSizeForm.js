import React from "react";
import { ValidatedField } from "components/input/ValidatedField";
import { useTranslation } from "utility/language";
import { useFormikContext } from "formik";
import { Row, Col } from "reactstrap";
import useColorsOptions from "utility/selectionOptions/useProductsColorsOptions";
import useProductsSizesOptions from "utility/selectionOptions/useProductsSizesOptions";
import { AddButton } from "components/AddButton";
import { SelectField } from "components/input";
import { history } from "../../../../../history";
const ColorAndSizeForm = ({  editMode = false }) => {
  const t = useTranslation();
  const formik = useFormikContext();
  const colorsOptions=useColorsOptions();
  const sizesOptions=useProductsSizesOptions();
  const colorStyles = {
    option: (styles, { data }) => {
        return {
            ...styles,
            backgroundColor: data.color,
            textAlign:"center",
            margin:"5px 0"
        };
    },
};

  return (
    <Row xs={1} sm={1} md={1} lg={2} xl={2}>
      <Col>
      
      <SelectField
          label={t("color")}
          options={colorsOptions}
          name="color_id"
          onChange={(opt) => {
            formik.setFieldValue("color_id", opt.value);
          }}
          required
          styles={colorStyles}
        />
         <p style={{margin:"2px auto",textAlign:"center"}}>--------------------{t("or")}--------------------</p>
                    <AddButton style={{margin:"0 auto",display:"block"}} onClick={()=>history.push("/products_colors")}>
            {t("add_new_color")}
        </AddButton>
       
     
        <SelectField
          label={t("size")}
          options={sizesOptions}
          name="size_id"
          onChange={(opt) => {
            formik.setFieldValue("size_id", opt.value);
          }}
          required
        />

        <p style={{margin:"2px auto",textAlign:"center"}}>--------------------{t("or")}--------------------</p>
        <AddButton style={{margin:"0 auto",display:"block"}} onClick={()=>history.push("/products_sizes")}>
                {t("add_new_size")}
        </AddButton>
      
   

     
        

      </Col>
      <Col>
         
      <ValidatedField
          name="quantity"
          label={t("quantity")}
          placeholder={t("quantity")}
          type="number"
        />

          {
           formik.values.size_id&& <ValidatedField
            name="price"
            label={t("price")}
            placeholder={t("price")}
            type="number"
          />
  
          }       </Col>

    </Row>
  );
};

export default ColorAndSizeForm;
