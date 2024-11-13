export const filterShopsBasedOnSearch = (shops, searchText) =>
  shops.filter((shop) =>
    shop.shop_details.some(({ shop_name }) =>
    shop_name.toLowerCase().includes(searchText.toLowerCase())
    )
  );
