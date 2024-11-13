import React from 'react'
import PropTypes from "prop-types";
import { LoadingButton } from './input';
import { useTranslation } from 'utility/language';
import { useAcceptAuctionOrder, useCancelAuctionOrder, useDeliverAuctionOrder, useDeliveredAuctionOrder } from 'api/auction_orders';
import AuctionOrderStatus from './AuctionOrderStatus';
export default function StatusActionAuctionController({ auction_order_status, auction_order_id }) {
    const acceptMutation = useAcceptAuctionOrder();
    const cancelMutation = useCancelAuctionOrder();
    const deliverMutation = useDeliverAuctionOrder();
    const deliveredMutation = useDeliveredAuctionOrder();
    const t = useTranslation();
    const controll = {

        pending_payment: {
            nextMutation: null,
            nextLabel: null,
            nextColor: null,
            prevMutation: cancelMutation,
            prevLabel: null,
            prevColor: null,
        },
        pending: {
            nextMutation: acceptMutation,
            nextLabel: "accept",
            nextColor: "primary",
            prevMutation: cancelMutation,
            prevLabel: "cancel",
            prevColor: "danger",
        },
        accepted: {
            nextMutation: deliverMutation,
            nextLabel: "deliver",
            nextColor: "primary",
            prevMutation: null,
            prevLabel: null
        },
        delivering: {
            nextMutation: deliveredMutation,
            nextLabel: "delivered",
            nextColor: "primary",
            prevMutation: null,
            prevLabel: null
        },
        delivered: {
            nextMutation: null,
            nextLabel: null,
            prevMutation: null,
            prevLabel: null
        },
        canceled: {
            nextMutation: null,
            nextLabel: null,
            prevMutation: null,
            prevLabel: null
        },

    }
    return (
        <div >
            
            <div className="d-flex   align-items-center  justify-content-start   m-1" style={{gap:"10px"}}>
                <p >{t("auction_order_status")}{" : "}{<AuctionOrderStatus auction_order_status={auction_order_status} />}</p>
                {
                    controll[auction_order_status].nextMutation && controll[auction_order_status].nextLabel && <LoadingButton
                        style={{ margin: "10px" }}
                        color={controll[auction_order_status].nextColor}
                        isLoading={controll[auction_order_status].nextMutation.isLoading||controll[auction_order_status]?.prevMutation?.isLoading}
                        onClick={() => controll[auction_order_status].nextMutation.mutate({ auction_order_id: auction_order_id })}
                    >
                        {t(controll[auction_order_status].nextLabel)}
                    </LoadingButton>
                }

                {
                    controll[auction_order_status].prevMutation && controll[auction_order_status].prevLabel && <LoadingButton
                        color={controll[auction_order_status].prevColor}
                        isLoading={controll[auction_order_status].prevMutation.isLoadingcontroll||[auction_order_status]?.nextMutation?.isLoading}
                        onClick={() => controll[auction_order_status].prevMutation.mutate({ auction_order_id: auction_order_id })}
                    >
                        {t(controll[auction_order_status].prevLabel)}
                    </LoadingButton>
                }
            </div>

        </div>
    )
}
StatusActionAuctionController.prototypes={
    auction_order_status:PropTypes.string.isRequired,
    auction_order_id:PropTypes.number.isRequired
}
