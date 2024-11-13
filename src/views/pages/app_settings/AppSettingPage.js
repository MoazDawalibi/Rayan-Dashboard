import React from "react";
import useTableColumns from "./useTableColumns";
import { useTranslation } from "utility/language";
import DataTable from "react-data-table-component";
import "assets/scss/plugins/extensions/react-paginate.scss";
import { Card, CardBody } from "reactstrap";
import { SearchInput } from "components/input/SearchInput";
import { filterCategoriesBasedOnSearch } from "./filters";
import { AddButton } from "components/AddButton";
import AddSetModal from "./AddSetModal";
import { TableSpinner } from "views/components/TableSpinner";
import EditSetModal from "./EditSetModal";
import { useGetSetting } from "api/app_setting";
import AuthComponent from "components/AuthComponent";
const AppSettingPage = () => {
  const t = useTranslation();
  //Data Manipulation -- Add + Edit

  const [searchText, setSearchText] = React.useState("");
  const [addModal, setAddModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [objectToEdit, setObjectToEdit] = React.useState(null);

  //Table Content -- Data + Columns
  const { data, isLoading } = useGetSetting({
    
  });

  const setting = data || [];
 
  const columns = useTableColumns(setEditModal, setObjectToEdit);
  //Data Filters
  const [filteredData, setFilteredData] = React.useState([]);

  React.useEffect(() => {
    if (Array.isArray(data?.data)) {
      if (searchText) {
        setFilteredData(
          filterCategoriesBasedOnSearch(data.categories, searchText)
        );
      } else {
        setFilteredData(data.categories);
      }
    }
  }, [searchText, data]);
  return (
    <>
      <h1>{t("app_setting")}</h1>
      <div className="d-flex align-items-center mb-1 justify-content-between">
        <div className="d-flex">
        <AuthComponent action="add">
            <AddButton onClick={() => setAddModal(true)} />
        </AuthComponent>
        </div>
        {/* <SearchInput
          onChange={setSearchText}
          placeholder={t("_search.setting")}
        /> */}
      </div>
      <Card>
        <CardBody className="p-1">
          <DataTable
            columns={columns}
            data={searchText ? filteredData : setting}
            progressPending={isLoading}
            progressComponent={<TableSpinner />}
            noDataComponent={<h6 className="my-4">{t("no_records")}</h6>}
            noHeader
          />
        </CardBody>
      </Card>
      <AddSetModal isOpen={addModal} setIsOpen={setAddModal} />
      <EditSetModal
        isOpen={editModal}
        setIsOpen={setEditModal}
        objectToEdit={objectToEdit}
        setObjectToEdit={setObjectToEdit}
      />
    </>
  );
};

export default AppSettingPage;

