import React, { ReactNode } from 'react'
import DataTable from 'react-data-table-component'
import { Card, CardBody } from 'reactstrap'
import { TableSpinner } from "views/components/TableSpinner";
import { useTranslation } from "utility/language";
import { usePaginationWithURL } from 'hooks';


function TableLayout(props){
    const t  = useTranslation()
    const  {data , isLoading ,columns  , totalRows, is_pagination = false , ...resprpos } = props 
    const { page, per_page, handlePageChange, handlePerPageChange } =usePaginationWithURL(props.location);

  return (
    <Card>
    <CardBody className="p-1">
      <DataTable
        columns={columns}
        data={data}
        progressPending={isLoading}
        progressComponent={<TableSpinner />}
        noDataComponent={<h6 className="my-4">{t("no_records")}</h6>}
        noHeader
        pagination={is_pagination}
        paginationServer={is_pagination}
        paginationComponent={() => (
          <ReactPaginate
            previousLabel={<ChevronLeft size={15} />}
            nextLabel={<ChevronRight size={15} />}
            breakLabel="..."
            breakClassName="break-me"
            pageCount={totalRows / per_page}
            containerClassName="vx-pagination separated-pagination pagination-center pagination-sm mb-0 mt-2"
            activeClassName="active"
            forcePage={page - 1}
            onPageChange={(v) => {
                handlePageChange(v);

            }}
          />
        )}
       { ...resprpos}
      />
    </CardBody>
  </Card>
  )
}

export default TableLayout