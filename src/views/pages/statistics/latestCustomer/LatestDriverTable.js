import { LoadingButton } from 'components/input';
import React from 'react'
import DataTable from 'react-data-table-component';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { useTranslation } from 'utility/language';
import useTableColumns from './useTableColumns';
import { history } from '../../../../history'

export default function LatestDiverTable({ latest_users }) {
  const columns = useTableColumns();
  const t = useTranslation();
  return (
    <Card>
      <CardHeader>
        {t("busiest_drivers")}

        <LoadingButton color="primary" onClick={() => history.push("/driver")}>
          {t("show_all_driver")}
        </LoadingButton>
      </CardHeader>
      <CardBody>

        <DataTable
          columns={columns}
          data={latest_users}
          noDataComponent={<h6 className="my-4">{t("no_records")}</h6>}
          noHeader
        />
      </CardBody>
    </Card>
  )
}
