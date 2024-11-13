import { useGetDriverOrder, useGetSingleDriver } from 'api/driver'
import SpinnerComponent from 'components/@vuexy/spinner/Fallback-spinner'
import PerPageDropdown from 'components/PerPageDropdown'
import { usePaginationWithURL } from 'hooks'
import { usePagination } from 'hooks/dataTable/usePagination'
import React from 'react'
import DataTable from 'react-data-table-component'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { useLocation, useParams } from 'react-router-dom'
import { Card, CardBody, CardHeader, CardTitle } from 'reactstrap'
import { useTranslation } from 'utility/language'
import { TableSpinner } from 'views/components/TableSpinner'
import useTableColumnsDriverOrder from './useTableColumnsDriverOrder'
import ReactPaginate from "react-paginate";
import './Pagination.scss'

function DriverOrder() {
const location = useLocation()
  
  const {id} = useParams()
  const { page, per_page, handlePageChange, handlePerPageChange } =
  usePaginationWithURL(location);
const filterPagination = usePagination();
  const {data:OrderDriver, isLoading}= useGetDriverOrder({
    driver_id:id,
    page,
     per_page
  })
 
  const DriverInfo = OrderDriver?.data
  const t = useTranslation()
  const column = useTableColumnsDriverOrder()
  const totalRows = OrderDriver?.total || 0;
  const filterIsApplied = false;



  if(isLoading){
    return <SpinnerComponent />  
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2>{t("driver_order")}</h2>
        </CardTitle>
        <div>
        <PerPageDropdown
          className="custom-dropdown mr-1"
          per_page={per_page}
          handlePerPage={(v) => {
            filterPagination.handlePageChange(0)
            handlePerPageChange(v);
            filterPagination.handlePerPageChange(v);
          
          }}
        />
        </div>
      </CardHeader>
      <CardBody>
      <DataTable
            columns={column}
            data={DriverInfo}
            
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
              containerClassName="vx-pagination separated-pagination pagination-center pagination-sm mb-0 mt-2 contanier"
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
  )
}

export default DriverOrder