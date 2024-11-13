import React from "react";
import useTableColumns from "./TableColumn/useTableColumns";
import { useTranslation } from "utility/language";
import DataTable from "react-data-table-component";
import "assets/scss/plugins/extensions/react-paginate.scss";
import { Card, CardBody } from "reactstrap";
import { SearchInput } from "components/input/SearchInput";
import { filterCategoriesBasedOnSearch } from "./FormGift/filters";
import { AddButton } from "components/AddButton";
import AddGiftModal from "./AddGiftModal";
import { TableSpinner } from "views/components/TableSpinner";
import { useIsAuthorized } from "redux/hooks/auth";
import { useGetSetting } from "api/app_setting";


const GiftPage = () => {
  const t = useTranslation();
  const isAuthorized = useIsAuthorized();
  //Data Manipulation -- Add + Edit
  const [addModal, setAddModal] = React.useState(false);

  //Table Content -- Data + Columns
  const { data, isLoading } = useGetSetting();
  const setting = data?.categories || [];
  const columns = useTableColumns();
  //Data Filters
  const [searchText, setSearchText] = React.useState("");
  const [filteredData, setFilteredData] = React.useState([]);
  React.useEffect(() => {
    if (Array.isArray(data?.categories)) {
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
      <h1>{t("gift")}</h1>
      <div className="d-flex align-items-center mb-1 justify-content-between">
        <div className="d-flex">
          {isAuthorized && <AddButton onClick={() => setAddModal(true)} />}
        </div>
        <SearchInput
          onChange={setSearchText}
          placeholder={t("_search.gift")}
        />
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
            pagination
          />
        </CardBody>
      </Card>
      <AddGiftModal isOpen={addModal} setIsOpen={setAddModal} />
    </>
  );
};

export default GiftPage;
