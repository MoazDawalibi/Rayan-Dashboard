export const filterProductsBasedOnSearch = (products, searchText) =>
  products.filter((product) =>
    product.product_details.some(({ product_name }) =>
      product_name.toLowerCase().includes(searchText.toLowerCase())
    )
  );

export const filterProductsBasedOnSubcategoryId = (products, subcategory_id) =>
  subcategory_id === ""
    ? products
    : products.filter((product) => product.subcategory_id === subcategory_id);

export const filterProductsBasedOnShopId = (products, shop_id) =>
  shop_id === ""
    ? products
    : products.filter((product) => product.shop_id === shop_id);
