import React from "react";
import useTableColumns from "./useTableColumns";
import { useTranslation } from "utility/language";
import DataTable from "react-data-table-component";
import "assets/scss/plugins/extensions/react-paginate.scss";
import { Card, CardBody } from "reactstrap";
import { TableSpinner } from "views/components/TableSpinner";
import { useGetOrders } from "api/orders";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";
import PerPageDropdown from "components/PerPageDropdown";
import { SearchInput } from "components/input";
import { usePaginationWithURL } from "hooks";
import { usePagination } from "hooks/dataTable/usePagination";
import SelectType from "./Select";
const OrderPage = (props) => {
  const t = useTranslation();

  const { page, per_page, handlePageChange, handlePerPageChange } =
    usePaginationWithURL(props.location);
  const filterPagination = usePagination();

  //filters
  const [search, setSearchText] = React.useState("");
 
  
  const filterIsApplied = search !== "";
  React.useEffect(() => {
    if (filterIsApplied) {
      filterPagination.handlePageChange(0);
    }
    //eslint-disable-next-line
  }, [search, filterIsApplied ]);
  const [SelectTypeTo , setSelectTypeTo] = React.useState('status')
  const [refreshPage , setRefreshPage] = React.useState(false)

  
  //Table Content -- Data + Columns
  const { data, isLoading  } = useGetOrders({
    page: filterIsApplied ? filterPagination.page : page,
    per_page,
    search,
    status:SelectTypeTo==="status"? localStorage.getItem('order_status') :SelectTypeTo
  },
  {
    refetchInterval:3000
  });
  const totalRows = data?.pagination?.total || 0;

  const columns = useTableColumns(SelectTypeTo);
  const ExpandedComponent = ({ data }) => {
    return <pre> <h4>{t("address")}</h4> {t('address_from')} : {data?.place_from} <br/> {t('address_to')}: {data?.place_to}</pre>;
  };
  return (
    <>
      <h1>{t("order")}</h1>
      <div className="d-flex align-items-center mb-1 justify-content-between">
      <div className="d-flex " style={{justifyContent:"space-between" , marginLeft:'auto'}}>
      <SelectType setSelectType={setSelectTypeTo}  title={SelectTypeTo} setRefreshPage={setRefreshPage} />

        <PerPageDropdown
            className="custom-dropdown mr-1"
            per_page={per_page}
            handlePerPage={(v) => {
              handlePerPageChange(v);
              filterPagination.handlePerPageChange(v);
           
             
            }}
          />
          
          <SearchInput onChange={setSearchText} placeholder={t("search")} />
        </div>
      </div>
      <Card>
        <CardBody className="p-1">
        <DataTable
            columns={columns}
            data={data?.data}
            progressPending={isLoading}
            progressComponent={<TableSpinner />}
            noDataComponent={<h6 className="my-4">{t("no_records")}</h6>}
            noHeader
            pagination
            expandableRows
            paginationServer
            expandableRowsComponent={<ExpandedComponent/>}
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

export default OrderPage;
