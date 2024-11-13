import React from 'react'
import DataTable from 'react-data-table-component';
import { ChevronLeft, ChevronRight } from 'react-feather';
import ReactPaginate from 'react-paginate';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { useTranslation } from 'utility/language';
import { TableSpinner } from 'views/components/TableSpinner';
import useTableColumns from './useTableColumns';
import "assets/scss/plugins/extensions/react-paginate.scss";
import { useParams } from 'react-router-dom';
import { usePagination } from 'hooks/dataTable/usePagination';
import PerPageDropdown from 'components/PerPageDropdown';
import { useCommentStatusOptions } from 'utility/selectionOptions/useCommentStatusOptions';
import Select from "react-select";


export default function Comments({
  commentQuery,
  commentMuation,

}) {
  const { page, per_page, handlePerPageChange, handlePageChange } = usePagination();
  const { id,shop_id } = useParams();
  const [selectedStatus, setSelectedStatus] = React.useState("");
  const statusOptions = useCommentStatusOptions()

  const { isLoading, data } = commentQuery({
    product_id: id,
    shop_id:shop_id,
    page: page,
    per_page: per_page,
    comment_status: selectedStatus
  });
  const comments = data?.data || [];
  const total = data?.total || 1;

  const t = useTranslation();
  const columns = useTableColumns(commentMuation)
  return (
    <Card>
      <CardHeader>

        <div style={{ width: "15rem" }} className="mr-1">

          <Select
            placeholder={t("status")}
            options={statusOptions}
            name="status"
            onChange={(opt) => {
              setSelectedStatus(opt.value);
            }}
          />
        </div>
        <PerPageDropdown
          className="custom-dropdown mr-1"
          per_page={per_page}
          handlePerPage={(v) => {
            handlePerPageChange(v);
          }}
        />

      </CardHeader>

      <CardBody>
        <DataTable
          columns={columns}
          data={comments}
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
              pageCount={total / per_page}
              containerClassName="vx-pagination separated-pagination pagination-center pagination-sm mb-0 mt-2"
              activeClassName="active"
              forcePage={
                page - 1
              }
              onPageChange={(v) => {

                handlePageChange(v);

              }}
            />
          )}

        />

      </CardBody>
    </Card>
  )
}
