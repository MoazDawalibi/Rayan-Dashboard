import { useTranslation } from "utility/language"

export const useAuctionStatusOptions = () => {
    const t = useTranslation();
    let options = [{
        value: "",
        label: t("all")
    },
    {
        value: "pending_payment",
        label: t("pending_payment")
    },
    {
        value: "pending",
        label: t("pending")
    },
    {
        value: "delivering",
        label: t("delivering")
    },
    {
        value: "delivered",
        label: t("delivered")
    },
    {
        value: "canceled",
        label: t("canceled")
    },
    {
        value: "accepted",
        label: t("accepted")
    }];
    return options;
}