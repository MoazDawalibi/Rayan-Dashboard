import { LoadingButton } from 'components/input';
import React from 'react'
import DataTable from "react-data-table-component";
import { Card, CardBody, CardHeader } from 'reactstrap';
import { useTranslation } from 'utility/language';
import useTableColumns from './useTableColumns';
import { history } from '../../../../history'
export default function LatestOrdersTable({ latest_Orders }) {
  
  const columns = useTableColumns();
  const t = useTranslation();
  return (
    <Card>
      <CardHeader>

        {t("latest_orders")}
        <LoadingButton color="primary" onClick={() => history.push("/orders")}>
          {t("show_all_orders")}
        </LoadingButton>
      </CardHeader>

      <CardBody>
        <DataTable
          columns={columns}
          data={latest_Orders}
          noDataComponent={<h6 className="my-4">{t("no_records")}</h6>}
          noHeader
        />

      </CardBody>
    </Card>
  )
}
