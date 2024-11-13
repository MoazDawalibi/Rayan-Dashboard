import React, { useMemo } from "react";
import { useTranslation } from "utility/language";
import { history } from "../../../history";
import { GrView } from "react-icons/gr";

const useTableColumns = () => {
  const t = useTranslation();
 

  return useMemo(
   
    () => [
      {
        name: t("order_code"),
        selector: "code",
        sortable: true,
        center: true,
      },
      {
        name: t("customer_name"), 
        sortable: false,
        center: true,
        cell:(row)=>{
          return row?.customer_name 
        }
      },
      {
        name: t("payment_method"),
        selector: "payment_method",
        sortable: false,
        center: true,
        cell:(row)=>t(row.payment_method)
      },
      {
        name: t("status"),
        selector: "status",
        sortable: false,
        center: true,
        cell:(row)=><span style={{
          backgroundColor:'#b8c2cc'
          ,padding:10, color:'white',borderRadius:12,fontSize:12}}>{t(row.status)}</span>
      
      },
      {
        name: t("relative_cost"),
        selector: "real_cost",
        sortable: false,
        center: true,
      },
      {
        name: t("date"),
        selector: "schedule_date",
        sortable: false,
        center: true,
      },
      {
        name: "#",
        sortable: false,
        center: true,
        cell: (row) => (
          <GrView
          onClick={()=>{
           history.push(`/order/${row.id}`)
          }}
          size={22}
          style={{ cursor: "pointer" }}
        />
        ),
      },
    ],
    [t]
  );
};

export default useTableColumns;
