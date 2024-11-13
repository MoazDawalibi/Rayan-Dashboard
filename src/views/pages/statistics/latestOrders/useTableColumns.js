import React, { useMemo } from "react";
import { useTranslation } from "utility/language";

import OrderStatus from "components/OrderStatus";
import { GrView } from "react-icons/gr";
import {history} from '../../../../history'

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
                name: t("driver_name"),
                sortable: false,
                center: true,
                cell:(row)=>{
                   
                    return (row?.driver?.full_name)
                }

            },

            {
                name: t("order_total"),
                sortable: true,
                center: true,
                selector:"average_cost"
            },
            {
                name: t("order_status"),
                sortable: false,
                center: true,
                cell:(row)=><span style={{
                    backgroundColor:row.status==='accepted'||row.status==='complete'||row.status==='pick_up'?"#28c76f":row.status==='pending'?'#b8c2cc':"#ff0000"
                    ,padding:8, color:'white',borderRadius:10,fontSize:10}}>{t(row.status)}</span>
                
            },
            {
                name: "#",
                selector: "action",
                sortable: false,
                center: true,
                cell: (row) => (
                    <GrView
                        onClick={() => history.push(`/order/${row?.id}`)}
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
