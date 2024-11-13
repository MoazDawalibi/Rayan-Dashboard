import React, { useState } from "react";
import { useGetAccounts } from "api/accounts";
import { useTranslation } from "utility/language";
import useTableColumns from "./useTableColumns";
import DataTable from "react-data-table-component";
import "assets/scss/plugins/extensions/react-paginate.scss";
import { Card, CardBody } from "reactstrap";
import { SearchInput } from "components/input/SearchInput";
import RoleFilter from "./RoleFilter";
import { TableSpinner } from "views/components/TableSpinner";
import EditPasswordModal from "../edit/EditPasswordModel";
const ViewPannel = (props) => {
  const t = useTranslation();

  const [searchText, setSearchText] = useState("");
  const [role, setRole] = useState("all");

  const { data, isLoading, isFetched } = useGetAccounts();
  const accounts = data?.accounts || [];
  
  const [filteredData, setFilteredData] = React.useState([]);
  const [editPasswordModal, setEditPasswordModal] = React.useState(false);
  const [objectToEdit, setObjectToEdit] = React.useState(null);

const columns = useTableColumns(setEditPasswordModal ,setObjectToEdit);
  React.useEffect(() => {
    if (isFetched) {
      setFilteredData(
        accounts
          .filter((acc) => (role === "all" ? true : role === acc.role_type))
          .filter(
            (acc) =>
              acc.full_name.toLowerCase().includes(searchText.toLowerCase()) ||
              acc.email.toLowerCase().includes(searchText.toLowerCase())
          )
      );
    }
    //eslint-disable-next-line
  }, [role, searchText, isFetched]);



  return (
    <>
      <h3 className="mb-1">{t("accounts")}</h3>
      <Card>
        <CardBody className="p-1">
          <DataTable
            columns={columns}
            data={data}
            progressPending={isLoading}
            progressComponent={<TableSpinner />}
            noDataComponent={<h6 className="my-4">{t("no_records")}</h6>}
            noHeader
            pagination
          />
        </CardBody>

        <EditPasswordModal
            isOpen={editPasswordModal}
            setIsOpen={setEditPasswordModal}
            objectToEdit={objectToEdit}
            setObjectToEdit={setObjectToEdit} />
      </Card>
    </>
  );
};

export default ViewPannel;
