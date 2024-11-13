import React from "react";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";
import "assets/scss/plugins/extensions/react-paginate.scss";
import { Card, CardBody } from "reactstrap";
import PerPageDropdown from "components/PerPageDropdown";
import { useTranslation } from "utility/language";
import { SearchInput } from "components/input/SearchInput";
import useTableColumns from "./useTableColumns";
import { usePagination } from "hooks/dataTable/usePagination";
import { usePaginationWithURL } from "hooks/usePaginationWithURL";
import { TableSpinner } from "views/components/TableSpinner";
import { useGetAllTransaction } from "api/transaction";
import { Select } from "@mui/material";
import { SelectField } from "components/input";
import { useState } from "react";
import SelectType from "./SelectType";

const UsersPage = (props) => {
  const t = useTranslation();
  //pagination
  const { page, per_page, handlePageChange, handlePerPageChange } =
    usePaginationWithURL(props.location);
  const filterPagination = usePagination();

  //filters
  const [search, setSearchText] = React.useState("");
  const [SelectTypeFrom ,setSelectTypeFrom] = useState('Type From')
  const [SelectTypeTo ,setSelectTypeTo]= useState('Type To')
  const [refreshPage , setRefreshPage] = React.useState(false)

  
  const filterIsApplied = search !== "";
  React.useEffect(() => {
    if (filterIsApplied) {
      filterPagination.handlePageChange(0);
    }
    //eslint-disable-next-line
  }, [search, filterIsApplied ]);

  //data
  const { data, isLoading } = useGetAllTransaction({
    page: filterIsApplied ? filterPagination.page : page,
    per_page,
    search,
    to_type_filter:SelectTypeTo ==='Type To'?localStorage.getItem('transactionType To'):SelectTypeTo,
    from_type_filter:SelectTypeFrom ==='Type From'? localStorage.getItem('transactionType From'):SelectTypeFrom
  
  });
  
  const transaction = data?.data || [];
  const totalRows = data?.pagination.total || 0;
  const columns = useTableColumns({
  });
  return (
    <>
      <div className="d-flex align-items-center mb-1 justify-content-between flex-wrap">
        <div className="d-fle align-items-center"> 
        <h1 className="">{t("transactions")}</h1>
        
        <div className="d-flex">
        </div></div>
        <div className="d-flex align-items-center justify-content-center " style={{justifyContent:"center"}}>
        <SelectType setSelectType={setSelectTypeFrom} title={SelectTypeFrom} key1={"Type From"} setRefreshPage={setRefreshPage}/>
        <SelectType setSelectType={setSelectTypeTo}  title={SelectTypeTo}  key1={"Type To"} setRefreshPage={setRefreshPage}/>
          <PerPageDropdown
            className="custom-dropdown mr-1"
            per_page={per_page}
            handlePerPage={(v) => {
              filterPagination.handlePageChange(0)
              handlePerPageChange(v);
              filterPagination.handlePerPageChange(v);
             
            }}
          />
          <SearchInput onChange={setSearchText} placeholder={t("_search.tran")}/>
        </div>
      </div>
      <Card>
     
           
          <CardBody className="p-1">
          <DataTable
            columns={columns}
            data={transaction}
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
            
            sortServer
          />
        </CardBody>
      </Card>

    </>
  );
};

export default UsersPage;

export const selectFailGender = [
  {value : "female" , label:"female"},
  {value:"male" , label:"male"}
] 