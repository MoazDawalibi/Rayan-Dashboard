import { useTranslation } from "utility/language"

export const useReviewsStatusOptions = () => {
    const t = useTranslation();
    let options = [{
        value: "",
        label: t("all")
    },
    {
        value: "pending",
        label: t("pending")
    },
    {
        value: "accepted",
        label: t("accepted")
    },
    {
        value: "rejected",
        label: t("rejected")
    },
    ];
    return options;
}