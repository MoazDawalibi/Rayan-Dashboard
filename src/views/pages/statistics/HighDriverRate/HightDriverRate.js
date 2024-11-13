import { LoadingButton } from 'components/input';
import React from 'react'
import DataTable from 'react-data-table-component';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { useTranslation } from 'utility/language';
import useTableColumns from './useTableColumns';
import { history } from '../../../../history'
import { useGetStatistics } from 'api/statistics';
import { TableSpinner } from 'components/table/TableSpinner';

export default function HighOrderRate({ latest_users }) {
  const columns = useTableColumns();
  const t = useTranslation();
  const [monthRate,setMonthRate ] = React.useState(null)
  const [yearRate, setyearRate] = React.useState(null)


  const { data: statistics, isLoading } = useGetStatistics({
    month_rate:monthRate,
    year_rate:yearRate
}); 
  return (
    <Card>
      <CardHeader>
        {t("high_drivers_rate")}

        <input type='month' onChange={(val) =>{
          
           setyearRate(val.target.value.split('-')[0])
           setMonthRate(val.target.value.split('-')[1])
        }} />
        <LoadingButton color="primary" onClick={() => history.push("/driver")}>
          {t("show_all_driver")}
        </LoadingButton>
      </CardHeader>
      <CardBody>

        <DataTable
          columns={columns}
          progressPending={isLoading}
          progressComponent={<TableSpinner />}
          data={statistics?.most_driver_rate}
          noDataComponent={<h6 className="my-4">{t("no_records")}</h6>}
          noHeader
        />
      </CardBody>
    </Card>
  )
}
