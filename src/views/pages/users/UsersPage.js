import React from "react";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";
import "assets/scss/plugins/extensions/react-paginate.scss";
import { Card, CardBody } from "reactstrap";
import PerPageDropdown from "components/PerPageDropdown";
import { useTranslation } from "utility/language";
import { SearchInput } from "components/input/SearchInput";
import { useGetUsers } from "api/users";
import useTableColumns from "./useTableColumns";
import { usePagination } from "hooks/dataTable/usePagination";
import { usePaginationWithURL } from "hooks/usePaginationWithURL";
import { useSorting } from "hooks/dataTable/useSorting";
import EditUserModal from "./EditUserModal";
import EditPasswordModal from "./EditPasswordModal";
import { TableSpinner } from "views/components/TableSpinner";

const UsersPage = (props) => {
  const t = useTranslation();

  //pagination
  const { page, per_page, handlePageChange, handlePerPageChange } =
    usePaginationWithURL(props.location);
  const filterPagination = usePagination();

  //Data Manipulation -- Edit
  const [editModal, setEditModal] = React.useState(false);
  const [editPasswordModal, setEditPasswordModal] = React.useState(false);
  const [objectToEdit, setObjectToEdit] = React.useState(null);

  //filters
  const [search, setSearchText] = React.useState("");
  const { order_by, order_type, handleSort } = useSorting();
  const filterIsApplied = search !== "";
  React.useEffect(() => {
    if (filterIsApplied) {
      filterPagination.handlePageChange(0);
    }
    //eslint-disable-next-line
  }, [search, filterIsApplied]);

  //data
  const { data, isLoading } = useGetUsers({
    page: filterIsApplied ? filterPagination.page : page,
    per_page,
    search,
    order_by,
    order_type,
  });
  const users = data?.data || [];
  const totalRows = data?.total || 0;
  const columns = useTableColumns({
    setEditModal,
    setObjectToEdit,
    setEditPasswordModal,
  });

  return (
    <>
      <div className="d-flex align-items-center mb-1 justify-content-between flex-wrap">
        <div className="d-flex align-items-center"></div>
        <div className="d-flex align-items-center">
          <PerPageDropdown
            className="custom-dropdown mr-1"
            per_page={per_page}
            handlePerPage={(v) => {
              handlePerPageChange(v);
              filterPagination.handlePerPageChange(v);
            }}
          />
          <SearchInput onChange={setSearchText} />
        </div>
      </div>
      <Card>
        <h4 className="pt-2 pl-2 mb-0">{t("users")}</h4>
        <CardBody className="p-1">
          <DataTable
            columns={columns}
            data={users}
            progressPending={isLoading}
            progressComponent={<TableSpinner />}
            noDataComponent={<h6 className="my-4">{t("no_records")}</h6>}
            noHeader
            pagination
            paginationServer
            paginationComponent={() => (
              <ReactPaginate
                previousLabel={<ChevronLeft size={15} />}
                nextLabel={<ChevronRight size={15} />}
                breakLabel="..."
                breakClassName="break-me"
                pageCount={totalRows / per_page}
                containerClassName="vx-pagination separated-pagination pagination-center pagination-sm mb-0 mt-2"
                activeClassName="active"
                forcePage={
                  filterIsApplied ? filterPagination.page - 1 : page - 1
                }
                onPageChange={(v) => {
                  if (filterIsApplied) {
                    filterPagination.handlePageChange(v);
                  } else {
                    handlePageChange(v);
                  }
                }}
              />
            )}
            onSort={handleSort}
            sortServer
          />
        </CardBody>
      </Card>
      <EditUserModal
        isOpen={editModal}
        setIsOpen={setEditModal}
        objectToEdit={objectToEdit}
        setObjectToEdit={setObjectToEdit}
      />
      <EditPasswordModal
        isOpen={editPasswordModal}
        setIsOpen={setEditPasswordModal}
        objectToEdit={objectToEdit}
        setObjectToEdit={setObjectToEdit}
      />
    </>
  );
};

export default UsersPage;
