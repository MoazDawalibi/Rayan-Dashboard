import React from "react";
import { useFormikContext } from "formik";
import useCategoryOptions from "utility/selectionOptions/useCategoryOptions";
import useSubCategoryOptions from "utility/selectionOptions/useSubCategoryOptions";
import useShopsOptions from "utility/selectionOptions/useShopsOptions";
import { SelectField } from "components/input/SelectField";
import { useTranslation } from "utility/language";

import useProductTypes, { TYPE } from "../useProductType";
import useShopCategoryOptions from "utility/selectionOptions/useShopCategoryOptions";
// import useColorsOptions from "utility/selectionOptions/useProductsColorsOptions";
// import ColorsView from "components/ColorsView";

const OwnerSelection = () => {
  const t = useTranslation();
  const formik = useFormikContext();
  const categoriesOptions = useCategoryOptions();
  const subcategoriesOptions = useSubCategoryOptions();

  return (
    <>
      <SelectField
        label={t("category")}
        options={categoriesOptions}
        name="category_id"
        onChange={(opt) => {
          formik.setFieldValue("category_id", opt.value);
          formik.setFieldValue("subcategory_id", "");
        }}
        isRequired
      />
      <SelectField
        label={t("subcategory")}
        options={subcategoriesOptions.filter(
          (opt) => opt.category_id === formik.values.category_id
        )}
        name="subcategory_id"
        onChange={(opt) => {
          formik.setFieldValue("subcategory_id", opt.value);
        }}
        isDisabled={formik.values.category_id === ""}
        isRequired
      />
    </>
  );
};

const ShopSelection = () => {
  const t = useTranslation();
  const formik = useFormikContext();
  const shopsOptions = useShopsOptions();
  const shopCategoriesOptions=useShopCategoryOptions({shop_id:formik.values.shop_id});
  
 



  // const colorsOptions=useColorsOptions({withNoneOption:false});

  //   const handleColorChange=(opt)=>{
  //     let colorsToSend=[...formik.values.colors,opt.value]
  //     formik.setFieldValue('colors',colorsToSend)
     


  //   }
  //   const deleteColor=(id)=>{
      
  //    let newColors=formik.values.colors.filter(color=>color!==id);
  //    formik.setFieldValue("colors",newColors)
  //   }

  return (
    <>
    <SelectField
      label={t("shop")}
      options={shopsOptions}
      name="shop_id"
      onChange={(opt) => {
        formik.setFieldValue("shop_id", opt.value);
      }}
      isRequired
    />
      <SelectField
      label={t("shop_category")}
      options={shopCategoriesOptions}
      name="shop_category_id"
      onChange={(opt) => {
        formik.setFieldValue("shop_category_id", opt.value);
      }}
      isRequired
      isDisabled={formik.values.shop_id === ""}
    />
    {/* {
      formik.values.colors.length>0&&<ColorsView colors={formik.values.colors} clicked={deleteColor} />
    }
       <SelectField
      label={t("colors")}
      options={colorsOptions}
      name="color_id"
      onChange={(opt) => {
       handleColorChange(opt)
      }}
      
   
    /> */}
     
    </>
  );
};

const SelectionForm = () => {
  const productType = useProductTypes();

  if (productType === TYPE.OWNER_PRODUCT) {
    return <OwnerSelection />;
  }
  if (productType === TYPE.SHOP_PRODUCT) {
    return <ShopSelection />;
  }
  return null;
};

export default SelectionForm;
