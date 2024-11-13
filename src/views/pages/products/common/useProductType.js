import React, { createContext, useContext } from "react";
import PropTypes from "prop-types";

export const TYPE = {
  OWNER_PRODUCT: "owner_product",
  SHOP_PRODUCT: "shop_product",
};
export const ALL_TYPES = ["owner_product", "shop_product"];

const ProductTypeContext = createContext();
export function ProductTypeProvider({ productType, children }) {
  return (
    <ProductTypeContext.Provider value={productType}>
      {children}
    </ProductTypeContext.Provider>
  );
}
ProductTypeProvider.propTypes = {
  productType: PropTypes.oneOf(ALL_TYPES).isRequired,
};

export default function useProductType() {
  return useContext(ProductTypeContext);
}
