import React, { useMemo } from "react";
import { useTranslation } from "utility/language";


import { ToggleStatus } from "components/ToggleStatus";


const useTableColumns = (commentMuation) => {
    const t = useTranslation();


    return useMemo(
        () => [
            {
                name: t("full_name"),
                selector: "full_name",
                sortable: true,
                center: true,
            },
            {
                name: t("phone"),
                selector: "phone",
                sortable: false,
                center: true,

            },

            {
                name: t("email"),
                selector: "email",
                sortable: true,
                center: true,

                cell: (row) => (
                    <p>{row.email}</p>
                ),
            },
            {
                name: t("comment"),
                selector: "name",
                center: true,
                sortable: false,
                cell: (row) => <p style={{ width: "100%" }}>{row.comment}</p>

            },
            {
                name: t("status"),
                sortable: false,
                center: true,
                cell: (row) => (
                    <ToggleStatus object={row} toggleMutation={commentMuation} />
                ),
            },



        ],
        [t, commentMuation]
    );
};

export default useTableColumns;
