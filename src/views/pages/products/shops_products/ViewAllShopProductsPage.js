import React from "react";
import useTableColumns from "./useTableColumns";
import { useTranslation } from "utility/language";
import DataTable from "components/table/DataTable";
import { Card, CardBody } from "reactstrap";
import { SearchInput } from "components/input/SearchInput";
import { useGetProducts } from "api/shops_products";
import { filterProductsBasedOnSearch } from "../common/utils/filters";
import { AddButton } from "components/AddButton";
import { history } from "../../../../history";

import Select from "react-select";
import useShopsOptions from "utility/selectionOptions/useShopsOptions";
import { ProductTypeProvider, TYPE } from "../common/useProductType";

import AuthComponent from "components/AuthComponent";

const PageContent = () => {
  const t = useTranslation();

  //Table Content -- Data + Columns
  const [selectedShop, setSelectedShop] = React.useState(null);
  const { data, isLoading } = useGetProducts(selectedShop);
  const products = data?.products || [];
  const columns = useTableColumns();

  //Data Filters
  const [searchText, setSearchText] = React.useState("");
  const [filteredData, setFilteredData] = React.useState([]);
  const shopsOptions = useShopsOptions();

  React.useEffect(() => {
    if (data && Array.isArray(data?.products)) {
      const products = data.products;
      if (searchText) {
        setFilteredData(filterProductsBasedOnSearch(products, searchText));
      } else {
        setFilteredData(products);
      }
    }
  }, [searchText, data]);

  return (
    <>
      <h1>{t("shops_products")}</h1>
      <div className="d-flex align-items-center mb-1 justify-content-between flex-wrap">
        <div className="d-flex">
          <AuthComponent>
            <AddButton onClick={() => history.push(`/shops-products/add`)} />
          </AuthComponent>
        </div>
        <div className="d-flex align-items-center">
          <div style={{ width: "15rem" }} className="mr-1">
            <Select
              placeholder={t("shop")}
              options={shopsOptions}
              name="shop_id"
              onChange={(opt) => {
                setSelectedShop(opt.value);
              }}
            />
          </div>
          <SearchInput
            onChange={setSearchText}
            placeholder={t("_search.product")}
          />
        </div>
      </div>
      <Card>
        <CardBody className="p-1">
          <DataTable
            columns={columns}
            data={searchText ? filteredData : products}
            progressPending={isLoading}
            noHeader
            pagination
            noDataComponent={
              <h6 className="my-4">
                {selectedShop !== null ? (
                  <>{t("no_records")}</>
                ) : (
                  <>{t("please_select_a_shop")}</>
                )}
              </h6>
            }
          />
        </CardBody>
      </Card>
    </>
  );
};

export default function ViewAllShopProductsPage() {
  return (
    <ProductTypeProvider productType={TYPE.SHOP_PRODUCT}>
      <PageContent />
    </ProductTypeProvider>
  );
}
