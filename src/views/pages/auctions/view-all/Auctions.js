import React from "react";
import useTableColumns from "./useTableColumns";
import { useTranslation } from "utility/language";
import DataTable from "components/table/DataTable";
import { Card, CardBody } from "reactstrap";
import { useGetAuctions } from "api/auctions";

import { AddButton } from "components/AddButton";
import { history } from "../../../../history";
import { useIsAuthorized } from "redux/hooks/auth";


const Auctions=()=>{
  const t = useTranslation();
  const isAuthorized = useIsAuthorized();

  //Table Content -- Data + Columns
  const { data, isLoading } = useGetAuctions();
  const auctions = data?.auctions || [];
  const columns = useTableColumns();





  return (
    <>
      <h1>{t("auctions")}</h1>
      <div className="d-flex align-items-center mb-1 justify-content-between flex-wrap">
        <div className="d-flex">
          {isAuthorized && (
            <AddButton onClick={() => history.push(`/auction/add`)} />
          )}
        </div>
      
      </div>
      <Card>
        <CardBody className="p-1">
          <DataTable
            columns={columns}
            data={
          
                auctions
            }
            progressPending={isLoading}
            noHeader
            pagination
          />
        </CardBody>
      </Card>
    </>
  );
};
export default Auctions;
