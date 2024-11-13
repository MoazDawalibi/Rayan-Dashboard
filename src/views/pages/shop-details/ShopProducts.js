import React from "react";
import useTableColumns from "./useTableColumns";
import { useTranslation } from "utility/language";
import DataTable from "components/table/DataTable";
import { SearchInput } from "components/input/SearchInput";
import { useGetProducts } from "api/shops_products";
import { AddButton } from "components/AddButton";
import { history } from "../../../history";
import PropTypes from "prop-types";

import AuthComponent from "components/AuthComponent";
import { Button,Card,CardBody } from "reactstrap";
import * as XLSX from 'xlsx'
import {  getShopDataToExport } from "../products/common/utils/formSchema";
import { usePaginationWithURL } from "hooks";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";
import { TableSpinner } from "views/components/TableSpinner";
import { usePagination } from "hooks/dataTable/usePagination";
import PerPageDropdown from "components/PerPageDropdown";

const ShopProducts = ({ shop_name,shop_id,location }) => {
  const t = useTranslation();
   //Data Filters
   const [searchText, setSearchText] = React.useState("");
 
  const { page, per_page, handlePageChange, handlePerPageChange } =
  usePaginationWithURL(location);
  const filterPagination = usePagination();
  const filterIsApplied = searchText !== "";
  //Table Content -- Data + Columns
  const { data, isLoading } = useGetProducts({
    
    shop_id,
    page: filterIsApplied ? filterPagination.page : page,
    per_page,
    search:searchText,
  });
  const products = data?.products?.data || [];
  const columns = useTableColumns();

 

  const totalRows = data?.products?.total || 0;


  React.useEffect(() => {
    if (filterIsApplied) {
      filterPagination.handlePageChange(0);
    }
    //eslint-disable-next-line
  }, [searchText, filterIsApplied]);


  const handleExportProducts=()=>{
    const newData=getShopDataToExport( products);
    let wb=XLSX.utils.book_new(),
    ws=XLSX.utils.json_to_sheet(newData);
    XLSX.utils.book_append_sheet(wb,ws,"TestSheet1"); 
   
    XLSX.writeFile(wb,`${shop_name}.xlsx`)
  }

  return (
    <>
      <div className="d-flex align-items-center mb-1 justify-content-between flex-wrap">
        <div className="d-flex">
          <h1>{t("products")}</h1>
        </div>
        <div className="d-flex align-items-center" style={{ gap: "1em" }}>
          <AuthComponent>
            {( products.length>0)&&<Button color="primary" onClick={handleExportProducts}>{t("export")}</Button>} 
            <AddButton
              onClick={() => history.push(`/shops-products/add`, { shop_id })}
              />
          </AuthComponent>

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

        <CardBody>

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

    </>
  );
};

ShopProducts.propTypes = {
  shop_id: PropTypes.number.isRequired,
};

export default ShopProducts;
