import React from "react";
import useTableColumns from "./useTableColumns";
import { useTranslation } from "utility/language";
import DataTable from "react-data-table-component";
import "assets/scss/plugins/extensions/react-paginate.scss";
import { Button, Card, CardBody } from "reactstrap";
import { AddButton } from "components/AddButton";
import AddSetModal from "./AddCodModal";
import { TableSpinner } from "views/components/TableSpinner";
import { useIsAuthorized } from "redux/hooks/auth";
import { useGetAllCodeWithOutPaginitions, useGetCode } from "api/code";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";
import { usePaginationWithURL } from "hooks";
import { usePagination } from "hooks/dataTable/usePagination";
import * as XLSX from 'xlsx'
import PerPageDropdown from "components/PerPageDropdown";
import { ChangeDataToPrint } from "./formUtils";
const CodePage = (props) => {
  const t = useTranslation();
  const isAuthorized = useIsAuthorized();
  //Data Manipulation -- Add + Edit
  const [addModal, setAddModal] = React.useState(false);
  //Table Content -- Data + Columns

  const { page, per_page, handlePageChange, handlePerPageChange } =
    usePaginationWithURL(props.location);
  const filterPagination = usePagination();

  const filterIsApplied = false;
  React.useEffect(() => {
    if (filterIsApplied) {
      filterPagination.handlePageChange(0);
    }
    //eslint-disable-next-line
  }, [filterIsApplied ]);

  const { data, isLoading } = useGetCode({
    page: filterIsApplied ? filterPagination.page : page,
    per_page,
  });
  const {data:code_with_out_paginition} = useGetAllCodeWithOutPaginitions()
  const handleExportProducts=()=>{
  
    const newData=ChangeDataToPrint(code_with_out_paginition);

    let wb=XLSX.utils.book_new(),
    ws=XLSX.utils.json_to_sheet(newData);
    XLSX.utils.book_append_sheet(wb,ws,"TestSheet1"); 
    XLSX.writeFile(wb,`${`codes`}.xlsx`)
  }


  const totalRows = data?.pagination?.total || 0;
  const Codes = data?.data || [];
  const columns = useTableColumns();
  //Data Filters
  const conditionalRowStyles = 
    [
      {
        when: row => row.deleted_at,
        style: (row)=>{
          
         return {
          opacity:0.4,
          
          color: 'black',
          '&:hover': {
            cursor: 'not-allowed',

         }
          
          }
        },
      },
    ]

  
  return (
    <>
      <h1 >{t("Code")}</h1>

      <div className="d-flex align-items-center mb-1 justify-content-between">
        <div className="d-flex" style={{justifyContent:"space-between", width:"100%"}}>
         <div>
         {isAuthorized && <AddButton onClick={() => setAddModal(true)} />}
          <Button color="primary" style={{marginInline:10}} onClick={()=>handleExportProducts()}>{t('print')}</Button>
         </div>
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
      </div>
      <Card>
        <CardBody className="p-1">
        <DataTable
            columns={columns}
            data={Codes}
            progressPending={isLoading}
            progressComponent={<TableSpinner />}
            noDataComponent={<h6 className="my-4">{t("no_records")}</h6>}
            noHeader
            pagination
          
            conditionalRowStyles={conditionalRowStyles}
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
      <AddSetModal isOpen={addModal} setIsOpen={setAddModal} />
      </Card>
    </>
  );
};

export default CodePage;
