import React from "react";
import useTableColumns from "./useTableColumns";
import { useTranslation } from "utility/language";
import DataTable from "react-data-table-component";
import "assets/scss/plugins/extensions/react-paginate.scss";
import { Card, CardBody } from "reactstrap";
import { SearchInput } from "components/input/SearchInput";
import { useGetCategories } from "api/categories";
import { useGetSubCategories } from "api/subcategories";
import { selectionFilter, searchFilter } from "./filters";
import useCategoryOptions from "utility/selectionOptions/useCategoryOptions";
import { AddButton } from "components/AddButton";
import Select from "react-select";
import AddSubCatModal from "./AddSubCatModal";
import EditSubCatModal from "./EditSubCatModal";
import { TableSpinner } from "views/components/TableSpinner";
import { useIsAuthorized } from "redux/hooks/auth";
const SubCategoriesPage = () => {
  const t = useTranslation();
  const isAuthorized = useIsAuthorized();
  //Data Manipulation -- Add + Edit
  const [addModal, setAddModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [objectToEdit, setObjectToEdit] = React.useState(null);
  //Table Content -- Data + Columns
  const { data: categories_data } = useGetCategories();
  const { data, isLoading } = useGetSubCategories();
  const subcategories = data?.subcategories || [];
  const categories = categories_data?.categories || [];
  const columns = useTableColumns(categories, setEditModal, setObjectToEdit);

  //Data Filters
  const [searchText, setSearchText] = React.useState("");
  const [filteredData, setFilteredData] = React.useState([]);
  const categoriesOptions = useCategoryOptions({ withAllOption: true });
  const [selectedCategory, setSelectedCategory] = React.useState(null);

  React.useEffect(() => {
    if (Array.isArray(data?.subcategories)) {
      const idFiltered = selectionFilter(data.subcategories, selectedCategory);
      if (searchText) {
        setFilteredData(searchFilter(idFiltered, searchText));
      } else {
        setFilteredData(idFiltered);
      }
    }
  }, [searchText, selectedCategory, data]);
  
  return (
    <>
      <h1>{t("subcategories")}</h1>
      <div className="d-flex align-items-center mb-1 justify-content-between flex-wrap">
        <div className="d-flex">
          {isAuthorized && <AddButton onClick={() => setAddModal(true)} />}
        </div>
        <div className="d-flex align-items-center">
          <div style={{ width: "15rem" }} className="mr-1">
            <Select
              placeholder={t("category")}
              options={categoriesOptions}
              name="category_id"
              onChange={(opt) => {
                setSelectedCategory(opt.value ?? "");
              }}
            />
          </div>
          <SearchInput
            onChange={setSearchText}
            placeholder={t("_search.subcategory")}
          />
        </div>
      </div>
      <Card>
        <CardBody className="p-1">
          <DataTable
            columns={columns}
            data={
              searchText || selectedCategory !== null
                ? filteredData
                : subcategories
            }
            progressPending={isLoading}
            progressComponent={<TableSpinner />}
            noDataComponent={<h6 className="my-4">{t("no_records")}</h6>}
            noHeader
            pagination
          />
        </CardBody>
      </Card>
      <AddSubCatModal isOpen={addModal} setIsOpen={setAddModal} />
      <EditSubCatModal
        isOpen={editModal}
        setIsOpen={setEditModal}
        objectToEdit={objectToEdit}
        setObjectToEdit={setObjectToEdit}
      />
    </>
  );
};

export default SubCategoriesPage;
