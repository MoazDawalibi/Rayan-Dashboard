import React from "react";
import DataTable from "react-data-table-component";
import "assets/scss/plugins/extensions/react-paginate.scss";
import { Card, CardBody } from "reactstrap";
import { useTranslation } from "utility/language";
import { TableSpinner } from "views/components/TableSpinner";
import { AddButton } from "components/AddButton";
import AuthComponent from "components/AuthComponent";
import { history } from "../../../history";
import { useGetNotifications } from "../../../api/notifications";
import useTableColumns from "./useTableColumns";
import { useGetAllRoles } from "api/role";


const RolePage = (props) => {
  const t = useTranslation();
  
  //data
  const { data, isLoading } = useGetAllRoles();
  const Nots = data || [];
  const columns = useTableColumns();

  return (
    <>
      <div className="d-flex align-items-center mb-1 justify-content-between flex-wrap">
        <div className="d-fle align-items-center"> 
        <h1 className="">{t("role")}</h1>
       
        <AuthComponent>
            <AddButton onClick={() => history.push('role/add')} />
          </AuthComponent>
        <div className="d-flex">
        </div></div>
      </div>
      <Card>
        
       
        <CardBody className="p-1">
          <DataTable
            columns={columns}
            data={Nots}
            progressPending={isLoading}
            progressComponent={<TableSpinner />}
            noDataComponent={<h6 className="my-4">{t("no_records")}</h6>}
            noHeader
            pagination
            paginationServer
            sortServer
          />
        </CardBody>
      </Card>

    </>
  );
};

export default RolePage;
