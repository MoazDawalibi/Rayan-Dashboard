import React from 'react'
import { useGetStatistics } from 'api/statistics'
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import StatisticsCards from 'components/@vuexy/statisticsCard/StatisticsCard';
import {  BsCart3, BsCodeSlash } from "react-icons/bs";
import { useTranslation } from 'utility/language';
import { history } from "../../../history";
import SpinnerComponent from 'components/@vuexy/spinner/Fallback-spinner';
import Tabels from './Tabels'
import YearChart from '../home/YearChart';
import { AiOutlineUser } from 'react-icons/ai';
import { FaRedRiver } from 'react-icons/fa';
import HighOrderRate from './HighDriverRate/HightDriverRate';
// import ChartLine from '../home/Chart';
export default function StatisticsPage() {
     const [datepicker, setDatePicker] = React.useState(new Date())
    const { data: statistics, isLoading } = useGetStatistics({
        order_daily_date:datepicker
    }); 
 
    const t = useTranslation();
    if (isLoading) {
        return <SpinnerComponent />
    }
    return (
        <>
            <Row xs={1} sm={1} md={1} lg={3} xl={3} >
                <Col style={{ padding:"0.5rem" }} onClick={() => history.push('/driver')}>
                <div style={{ cursor: "pointer" }}>
                    <StatisticsCards
                        icon={<FaRedRiver className="warning" size={24} />}
                        stat={`${(statistics?.drivers_count)??1}`}
                        statContent={t(`You_have`)+"  "+((statistics?.drivers_count)??1)+"  "+ t(`Driver_in_your_Application`) }
                        CardName={t("show_all_driver")}
                        hideChart
                        iconCenter
                    />
                    </div>
                </Col>
                <Col  style={{padding:"0.5rem"}} onClick={() => history.push('customer')}>
                    <div style={{ cursor: "pointer" }}>

                    <StatisticsCards
                        icon={<AiOutlineUser className="warning" size={24} />}
                        stat={`${(statistics?.users_count)??1}`}
                        statContent={t(`You_have`)+"  "+((statistics?.users_count)??1)+"  "+ t(`User_in_your_Application`) }
                        CardName={t("show_all_customer")}
                        hideChart
                        iconCenter
                    />
                    </div>
                </Col>
            
                <Col style={{padding:"0.5rem"}} onClick={() => history.push('/orders')}>
                    <div style={{ cursor: "pointer" }} >

                    <StatisticsCards
                        icon={<BsCart3 className="warning" size={24} />}
                        stat={`${(statistics?.orders_count)??1}`}
                        statContent={t(`You_have`)+"  "+((statistics?.orders_count)??1)+"  "+ t(`Order_in_your_Application`) }
                        CardName={t("show_all_orders")}
                        hideChart
                        iconCenter
                    />
                    </div>
                </Col>
                {/* <Col style={{padding:"0.5rem"}} onClick={() => history.push('/shops')}>
                    <div style={{ cursor: "pointer" }} >

                    <StatisticsCards
                        icon={<BsShop className="warning" size={24} />}
                        stat={`${statistics?.shops_count}`}
                        statTitle={t("_active.shops_count")}
                        hideChart
                        iconLeft
                    />
                    </div>
                </Col> */}
            </Row>
            <Row xs={1} sm={1} md={1} lg={2} xl={2} >
            <Col style={{ padding:"0.5rem" }}>
                <div style={{ cursor: "pointer" }}>
                <Card className="app">
                    <CardHeader >
                        {/* <DatePicker format="MM/dd" value={datepicker} onChange={setDatePicker} /> */}
                        <div>

                    <input type='date' onChange={(e)=>setDatePicker(e.target.value)}  value={datepicker} style={{padding:"4px" , border:"2px solid #8328f2"}}/>
                        </div>
                        </CardHeader>
                        <p style={{margin:"20px 40px 0" , fontWeight:"bold", font:"caption"}}><BsCart3 className="primary" style={{marginInline:10}} size={24} />{t("daily_order")} </p>
                    <CardBody  className="row">
                    <div className="col mixed-chart">
                    <p style={{margin:"20px 40px" }}>{t("order_count")}:<span style={{marginLeft:"10px"}}>{(statistics?.orders_in_daily[0]?.order_count)||0}</span></p>
                    <p style={{margin:"20px 40px" }}>{t("total_order_price")}:<span style={{marginLeft:"10px"}}>{(parseFloat((statistics?.orders_in_daily[0]?.totla)||0) +parseFloat((statistics?.orders_in_daily[0]?.totla2||0)))||0}</span></p>

                    </div>
                    </CardBody>
                    </Card>
                </div>
                </Col>
                  <Col>
                <HighOrderRate latest_users={statistics?.busiest_drivers} />
                    </Col>
            </Row>
            <Tabels  latest_orders={statistics?.latest_orders}
                     latest_users={statistics?.busiest_drivers} 
                    //  latest_user={statistics?.latest_users}
                      />
            {/* <ChartLine  />  */}
            <YearChart  datas={statistics?.orders_in_year}/>
        </>
    )
}
