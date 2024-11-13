import React, { useMemo } from "react";
import { useTranslation } from "utility/language";
import ReactStars from "react-rating-stars-component";
import Actions from "components/table/TableActions";

import ReviewStatus from "components/ReviewStatus";


const useTableColumns = (setObjectToEdit, setOpen) => {
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
                name: t("review_stars"),
                selector: "review_stars",
                center: true,
                sortable: false,
                cell: (row) => <>
                    <ReactStars
                        value={row.review_stars}
                        edit={false}
                        count={5}
                        size={22} />
                </>
            },

            {
                name: t("review_description"),
                selector: "review_description",
                center: true,
                sortable: false,
                cell: (row) => <p style={{ width: "100%" }}>{row?.review_description}</p>

            },
            {

                name: t("review_status"),

                sortable: false,
                center: true,
                cell: (row) => <ReviewStatus review_status={row.review_status} />

            },
            {
                name: t("change_review_status"),
                sortable: false,
                center: true,
                cell: (row) => (
                    <Actions
                        onEdit={() => {
                            setOpen(true);
                            setObjectToEdit(row);
                        }}
                        showDelete={false}
                    />
                ),
            },



        ],
        [t, setOpen, setObjectToEdit]
    );
};

export default useTableColumns;
