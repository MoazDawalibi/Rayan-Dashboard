export const selectionFilter = (Drivers, category_id) =>
  Drivers.filter(
    (sub) => category_id === "" || sub.category_id === category_id
  );

export const searchFilter = (Drivers, searchText) =>
  Drivers.filter((sub) =>
    sub.subcategory_details.some(({ subcategory_name }) =>
      subcategory_name.toLowerCase().includes(searchText.toLowerCase())
    )
  );
