import { useGetStatistics } from "api/statistics";
import React, { Component } from "react";
import { useState } from "react";
import Chart from "react-apexcharts";
import DatePicker from "react-date-picker";
import { Card, CardBody, CardHeader } from "reactstrap";
import { useTranslation } from "utility/language";
 export default function useChartLine (){
  const date = new Date();

    const day = date.getDate();
    const month = date.getMonth() + 1;
   const year = date.getFullYear();
    const [datepicker, setDatePicker] = React.useState(year +"."+month +"."+ day)
    const { data, isLoading  } = useGetStatistics({start_date:datepicker}); 
    const t = useTranslation()
const optionsMixedChart  =
    {
    
        chart: {
          id: "basic-bar",
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            columnWidth: "100%"
          }
        },
        stroke: {
          width: [4, 0, 0]
        },
        xaxis: {
          categories: [t("sunday"), t("monday"), t("tuesday"), t("wednesday"), t("thursday"), t("friday"), t("saturday")]
        },
        markers: {
          size: 6,
          strokeWidth: 3,
          fillOpacity: 0,
          strokeOpacity: 0,
          hover: {
            size: 8
          }
        },
        yaxis: {
          tickAmount: 5,
          min: 0,
          // max:15
          max: Math.max.apply(null, data?.orders_in_week)+10
        },
        colors:['#7367F0']
      }

const seriesMixedChart  = [
        {
          name: t('order'),
          type: "line",
          // data: [1 , 4 ,2 ,10 ,3,5,1]
        data:(data?.orders_in_week)?.slice(0, 7)
        }
      ] 
      const handelCHange  = (value) =>{

        let newvalue = value.replace('-','.')
        newvalue = newvalue.replace('-','.')
        setDatePicker(newvalue)
      }
      return (
      <Card className="app">

            <CardHeader >
                 {/* <DatePicker format="MM/dd" value={datepicker} onChange={setDatePicker} /> */}
                 <div>
          
               <input type='date' onChange={(e)=>handelCHange(e.target.value)}  value={datepicker} style={{padding:"4px"}}/>
               <p style={{marginInline:"10px" , fontWeight:"bold" , marginTop:"10px"}}>{datepicker}</p>
                 </div>

                </CardHeader>
                <p style={{margin:"20px 40px" , fontWeight:"bold"}}>{t("daily_order_over_week")}</p>
                
                
        <CardBody className="row">
          <div className="col mixed-chart">
            <Chart
              options={optionsMixedChart}
              series={seriesMixedChart}
              type="line"
              width="100%"
              height="350"
              
            />
          </div>
        </CardBody>

      
        
      </Card>
    );
  
}

