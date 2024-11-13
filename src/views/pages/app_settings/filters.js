export const filterCategoriesBasedOnSearch = (categories, searchText) =>
  categories.filter((category) =>
    category.category_details.some(({ category_name }) =>
      category_name.toLowerCase().includes(searchText.toLowerCase())
    )
  );
