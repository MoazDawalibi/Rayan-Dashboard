import React from "react";
import { ProductTypeProvider, TYPE } from "../common/useProductType";

import AddProductPage from "../common/AddProductPage";

import { useAddProduct } from "api/owner_products";

const AddOwnerProductPage = () => {
  const mutation = useAddProduct();
  return (
    <ProductTypeProvider productType={TYPE.OWNER_PRODUCT}>
      <AddProductPage mutation={mutation} />
    </ProductTypeProvider>
  );
};

export default AddOwnerProductPage;
