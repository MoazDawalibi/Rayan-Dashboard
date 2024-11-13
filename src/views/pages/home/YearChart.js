import React from 'react'
import StatisticsCard from "components/@vuexy/statisticsCard/StatisticsCard";
import DatePicker from 'react-date-picker';
import { Card, CardHeader, CardBody, Spinner } from 'reactstrap';
import { useGetYearlyStatistics } from 'api/home';
import { useTranslation } from 'utility/language';
import CustomCard from 'views/components/CustomCard';
import PeopleIcon from "@mui/icons-material/People";
import { useGetStatistics } from 'api/statistics';

export default function YearChart() {

    const [datepicker, setDatePicker] = React.useState(new Date())
  
    const { data: statistics, isLoading } = useGetStatistics({year:datepicker}); 
    const t = useTranslation()
    const data = {yearly_visitors_over_months:statistics?.orders_in_year }
    
    const visits = data?.yearly_visitors_over_months || [];
    visits?.unshift(0)
    const series = [{ name: t("orders"), data: [visits["1"], visits["2"], visits["3"], visits["4"], visits["5"], visits["6"], visits["7"], visits["8"], visits["9"], visits["10"], visits["11"], visits["12"],] }]
    const options = {
        chart: {
            type: 'bar',
            height: 360
        },

        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'nov', 'Dec'],
        },
        fill: {
            opacity: 1
        },
        colors: ['#8328f2'],
    }

    if (isLoading)
        return (
            <CustomCard>
                <Spinner />
            </CustomCard>
        )
    return (
        <div>
            <Card>
                <CardHeader>
                 <DatePicker format="y" value={datepicker} onChange={setDatePicker} />
                 
                </CardHeader>
                <CardBody>

                    <StatisticsCard
                        icon={<PeopleIcon className="warning" size={24} />}
                        statTitle={t("yearly_order_over_month")}
                        type="bar"
                        options={options}
                        height={360}
                        series={series}
                        iconLeft
                    />
                </CardBody>
            </Card>
        </div>
    )
}
