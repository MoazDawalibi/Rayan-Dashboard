import { useMemo } from "react";
import { useTranslation } from "utility/language";



const useTableColumns = () => {
    const t = useTranslation();

    return useMemo(
        () => [
            {
                // name: t(""),
                // selector: "",
                sortable: false,
                center: true,
            },
            {
                name: t("phone"),
                selector: "phone",
                sortable: true,
                center: true,

            },



        ],
        [t]
    );
};

export default useTableColumns;
