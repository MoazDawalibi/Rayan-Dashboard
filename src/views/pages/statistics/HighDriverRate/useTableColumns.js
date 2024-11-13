import { useMemo } from "react";
import { GrView } from "react-icons/gr";
import { Rating } from "react-simple-star-rating";
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
                cell:(row)=>(row?.driver_name)
            },
            {
                name: t("rate"),
                sortable: false,
                center: true,
                cell:(row)=><Rating initialValue={row?.rate}  size={23}readonly={true}/>
            },
            {
                name: "#",
                selector: "action",
                sortable: false,
                center: true,
                cell: (row) => (
                    <GrView
                        onClick={() => history.push(`/driver/${row?.driver_id}`)}
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
