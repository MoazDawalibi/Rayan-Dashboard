import React from "react";
import { ProductTypeProvider, TYPE } from "../common/useProductType";

import AddProductPage from "../common/AddProductPage";

import { useAddProduct } from "api/shops_products";
import { useLocation } from "react-router-dom";

const AddShopProductPage = () => {
  const location = useLocation();
  const initialValues = {
    shop_id: location?.state?.shop_id ?? "",
  };
  const mutation = useAddProduct();

  return (
    <ProductTypeProvider productType={TYPE.SHOP_PRODUCT}>
      <AddProductPage initialValues={initialValues} mutation={mutation} />
    </ProductTypeProvider>
  );
};

export default AddShopProductPage;
