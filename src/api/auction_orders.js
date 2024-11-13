import { useAddMutation, useGetQuery,useUpdateMutation ,useDeleteMutation} from "./helpers";
const KEYS={
    AUCTION_ORDERS:"AUCTION_ORDERS",
    SINGLE_AUCTION_ORDER:"SINGLE_AUCTION_ORDER"
}
const API={
    GET_AUCTION_ORDERS:`/api/admin/auction_orders`,
    SINGLE_AUCTION_ORDER:`/api/admin/auction_order`,
    ADD_AUCTION_ORDER:`/api/admin/auction_order/add`,
    UPDATE_UNPAID_AUCTION_ORDER:`/api/admin/auction_order/update_unpaid`,
    UPDATE_PAID_AUCTION_ORDER:`/api/admin/auction_order/update_paid`,
    ACCEPT:`/api/admin/auction_order/accept`,
    CANCLE:`/api/admin/auction_order/cancel`,
    DELIVERING:`/api/admin/auction_order/delivering`,
    DELIVERED:`/api/admin/auction_order/delivered`,
    DELETE:`/api/admin/auction_order/delete`
}
export const useGetAuctionOrders=(params)=>useGetQuery(KEYS.AUCTION_ORDERS,API.GET_AUCTION_ORDERS,params);
export const useGetSingleAuctionOrder=(params)=>useGetQuery(KEYS.SINGLE_AUCTION_ORDER,API.SINGLE_AUCTION_ORDER,params);
export const useUpdateAuctionOrder=(auction_order_status)=>useUpdateMutation(KEYS.AUCTION_ORDERS,
    auction_order_status==="pending_payment"?API.UPDATE_UNPAID_AUCTION_ORDER:
    API.UPDATE_PAID_AUCTION_ORDER
    )
export const useAddAuctionOrder=()=>useAddMutation(KEYS.AUCTION_ORDERS,API.ADD_AUCTION_ORDER)
export const useAcceptAuctionOrder=()=>useUpdateMutation(KEYS.SINGLE_AUCTION_ORDER,API.ACCEPT);
export const useCancelAuctionOrder=()=>useUpdateMutation(KEYS.SINGLE_AUCTION_ORDER,API.CANCLE);
export const useDeliverAuctionOrder=()=>useUpdateMutation(KEYS.SINGLE_AUCTION_ORDER,API.DELIVERING);
export const useDeliveredAuctionOrder=()=>useUpdateMutation(KEYS.SINGLE_AUCTION_ORDER,API.DELIVERED);
export const useDeleteAuctionOrder=()=>useDeleteMutation(KEYS.SINGLE_AUCTION_ORDER,API.DELETE,"auction_order_id","auction_orders");