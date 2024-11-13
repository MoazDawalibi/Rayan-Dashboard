export const selectionFilter = (subcategories, category_id) =>
  subcategories.filter(
    (sub) => category_id === "" || sub.category_id === category_id
  );

export const searchFilter = (sub, searchText) =>
  sub.filter((sub) =>
    sub.subcategory_details.some(({ subcategory_name }) =>
      subcategory_name.toLowerCase().includes(searchText.toLowerCase())
    )
  );
