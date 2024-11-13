import { useMemo } from "react";
import { GrView } from "react-icons/gr";
import { useTranslation } from "utility/language";
import {history} from '../../../../history'



const useTableColumns = () => {
    const t = useTranslation();

    return useMemo(
        () => [
            {
                name: t("full_name"),
                sortable: false,
                center: true,
                cell:(row)=>(row?.full_name)
            },
            {
                name: t("phone"),
                sortable: true,
                center: true,
                cell:(row)=>(row?.phone)


            },
            {
                name: t("wallet"),
                sortable: true,
                center: true,
                cell:(row)=>(row?.wallet)

            },
            {
                name: "#",
                selector: "action",
                sortable: false,
                center: true,
                cell: (row) => {


                    return(
                        <GrView
                        onClick={() => history.push(`/driver/${row?.id}`)}
                        size={22}
                        style={{ cursor: "pointer" }}
                    />
                    )
                }
                   
                
            },
            


        ],
        [t]
    );
};

export default useTableColumns;
