import React from 'react'

import { LoadingButton } from './input';
import { useTranslation } from 'utility/language';
import ReviewStatus from './ReviewStatus';
export default function ReviewStatusActionController({ review_status, review_id, reviewsMutation }) {

    const t = useTranslation();
    const controll = {
        pending: {
            nextMutation: "accepted",
            nextLabel: "accept",
            nextColor: "primary",
            prevMutation: "rejected",
            prevLabel: "reject",
            prevColor: "danger",
        },
        accepted: {
            nextMutation: "rejected",
            nextLabel: "reject",
            nextColor: "danger",
            prevMutation: "pending",
            prevLabel: "pend",
            prevColor: "secondary"
        },
        rejected: {
            nextMutation: "accepted",
            nextLabel: "accept",
            nextColor: "primary",
            prevMutation: "pending",
            prevLabel: "pend",
            prevColor: "secondary"
        },


    }
    return (
        <div >
            <div className="d-flex   align-items-center  justify-content-start   m-1" style={{ gap: "10px", flexDirection: "column" }}>
                <p >{t("review_status")}{" : "}{<ReviewStatus review_status={review_status} />}</p>
                <div className="d-flex    align-items-center  justify-content-start   m-1" style={{ gap: "10px" }}>
                    {
                        controll[review_status].nextMutation && controll[review_status].nextLabel && <LoadingButton
                            style={{ margin: "10px" }}
                            color={controll[review_status].nextColor}
                            isLoading={reviewsMutation.isLoading}
                            onClick={() => reviewsMutation.mutate({ review_id: review_id, new_status: controll[review_status].nextMutation })}
                        >
                            {t(controll[review_status].nextLabel)}
                        </LoadingButton>
                    }

                    {
                        controll[review_status].prevMutation && controll[review_status].prevLabel && <LoadingButton
                            color={controll[review_status].prevColor}
                            isLoading={reviewsMutation.isLoading}
                            onClick={() => reviewsMutation.mutate({ review_id: review_id, new_status: controll[review_status].prevMutation })}

                        >
                            {t(controll[review_status].prevLabel)}
                        </LoadingButton>
                    }
                </div>

            </div>

        </div>
    )
}
