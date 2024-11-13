import React from "react";
import useTableColumns from "./useTableColumns";
import { useTranslation } from "utility/language";
import DataTable from "components/table/DataTable";
import { Card, CardBody ,Button} from "reactstrap";
import { SearchInput } from "components/input/SearchInput";
import { useGetProducts } from "api/owner_products";

import { AddButton } from "components/AddButton";
import { history } from "../../../../history";
import { useIsAuthorized } from "redux/hooks/auth";

import Select from "react-select";
import useSubCategoryOptions from "utility/selectionOptions/useSubCategoryOptions";
import { ProductTypeProvider, TYPE } from "../common/useProductType";
import * as XLSX from 'xlsx'
import { getOwnerDataToExport } from "../common/utils/formSchema";
import { usePaginationWithURL } from "hooks";
import { usePagination } from "hooks/dataTable/usePagination";
import { TableSpinner } from "views/components/TableSpinner";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";
import PerPageDropdown from "components/PerPageDropdown";

const PageContent = ({location}) => {
  
  const { page, per_page, handlePageChange, handlePerPageChange } =
  usePaginationWithURL(location);
const filterPagination = usePagination();

  const t = useTranslation();
  const isAuthorized = useIsAuthorized();

  
  //Data Filters
  const [searchText, setSearchText] = React.useState("");
  const subCategoryOptions = useSubCategoryOptions({ withAllOption: true });
  const [selectedSubCategory, setSelectedSubCategory] = React.useState("");
  const filterIsApplied = searchText !== "" || selectedSubCategory !=="";
  //Table Content -- Data + Columns
  const { data, isLoading } = useGetProducts({
    page: filterIsApplied ? filterPagination.page : page,
    per_page,
    search:searchText,
    subcategory_id: selectedSubCategory,


  });
  const products = data?.products?.data || [];
  
  const totalRows = data?.products?.total || 0;
  const columns = useTableColumns();


  React.useEffect(() => {
    if (filterIsApplied) {
      filterPagination.handlePageChange(0);
    }
    //eslint-disable-next-line
  }, [searchText, filterIsApplied]);

  const handleExportProducts=()=>{
    const newData=getOwnerDataToExport( products);
      let wb=XLSX.utils.book_new(),
      ws=XLSX.utils.json_to_sheet(newData);
      XLSX.utils.book_append_sheet(wb,ws,"TestSheet1"); 
    XLSX.writeFile(wb,"Elite-Auction-Products.xlsx")
  }
  
  
  return (
    <>
      <h1>{t("owner_products")}</h1>
      <div className="d-flex align-items-center mb-1 justify-content-between flex-wrap">
        <div className="d-flex">
          {isAuthorized && (<>
            {( products.length>0)&&<Button style={{margin:"0 5px"}} color="primary" onClick={handleExportProducts}>{t("export")}</Button>} 
            <AddButton onClick={() => history.push(`/owner-products/add`)} />
            </>
          )}
        </div>
        <div className="d-flex align-items-center">
          <div style={{ width: "15rem" }} className="mr-1">
            <Select
              placeholder={t("subcategory")}
              options={subCategoryOptions}
              name="subcategory_id"
              onChange={(opt) => {
                setSelectedSubCategory(opt.value);
              }}
            />
           
          </div>
          <PerPageDropdown
            className="custom-dropdown mr-1"
            per_page={per_page}
            handlePerPage={(v) => {
              handlePerPageChange(v);
              filterPagination.handlePerPageChange(v);
            }}
          />
          <SearchInput
            onChange={setSearchText}
            placeholder={t("_search.product")}
          />
        </div>
      </div>
      <Card>
        <CardBody className="p-1">
          <DataTable
            data={
              products
            }
            columns={columns}
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
          />
        </CardBody>
      </Card>
    </>
  );
};

export default function ViewAllOwnerProductsPage(props) {
  return (
    <ProductTypeProvider productType={TYPE.OWNER_PRODUCT}>
      <PageContent location={props.location}/>
    </ProductTypeProvider>
  );
}
