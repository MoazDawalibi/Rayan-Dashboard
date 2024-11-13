import { useTranslation } from "utility/language"

export const useCommentStatusOptions = () => {
    const t = useTranslation();
    let options = [{
        value: "",
        label: t("all")
    },
    {
        value: "1",
        label: t("showed")
    },
    {
        value: "0",
        label: t("hidden")
    },
    ];
    return options;
}