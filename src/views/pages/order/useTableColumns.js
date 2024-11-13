import React, { useMemo } from "react";
import { useTranslation } from "utility/language";
import { history } from "../../../history";
import { GrView } from "react-icons/gr";

const useTableColumns = (status) => {
  const t = useTranslation();


   
    let column =  [
      {
        name: t("customer_name"),
        sortable: false,
        center:true,
        selector:"customer_name",
      },
      {
        name: t("driver_name"),
        sortable: false,
        center: true,
        selector:"driver_name",
      },
      {
        name: t("paid_type"),
        selector: "payment_method",
        center: true,
        cell:(row)=>{
          return t(row?.payment_method)
        }
      },
      {
        name: t("status"),
        center: true,
        
        cell:(row)=><span style={{
          backgroundColor:row?.order_status==='accepted'||row?.order_status==='complete'||row?.order_status==='pick_up'?"#28c76f":row?.order_status==='pending'?'#b8c2cc':"#ff0000"
        ,width:100  ,padding:9, color:'white',borderRadius:12,fontSize:11, textAlign:"center"}}>{t(row?.order_status)}</span>
      },
      {
        name: t("order_price"),
        selector: "real_cost",
        center: true,
      },
      {
        name: t("money_received"),

        center: true,
        cell:(row)=>{
        
          return  parseFloat(row?.real_cost) + parseFloat(row?.cash_remaining||0)
        }
      },
    
    ]


    if(status  === 'canceled'){
      column.push(      {
        name: t("canceled_by"),
          center: true,
        selector:"who_canceled"
         },)
      column.push(  {
        name: "#",
        sortable: false,
        center: true,
        cell: (row) => (
          <GrView
          onClick={()=>history.push(`/order/${row?.order_id}`)}
          size={22}
          style={{ cursor: "pointer" }}
        />
        ),
      },)
    }
    else{
    
        column.push( {
          name: t("end_tripe_date"),
            center: true,
          selector:"end_tripe_date",
          width:"110px",
          cell:(row)=>{
            if(!(row?.end_tripe_date)){
              return '...'
            }

            return (row?.end_tripe_date.slice(0,11))
            
          }

           },)
        column.push(  {
          name: "#",
          sortable: false,
          center: true,
          width:"100px",
          cell: (row) => (
            <GrView
            onClick={()=>history.push(`/order/${row?.order_id}`)}
            size={22}
            style={{ cursor: "pointer" }}
          />
          ),
        },)
  
    }
    return column 

};

export default useTableColumns;
