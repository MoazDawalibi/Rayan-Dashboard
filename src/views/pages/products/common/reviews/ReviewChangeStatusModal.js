import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import { useTranslation } from 'utility/language'
import ReviewStatusActionController from 'components/ReviewStatusActionController'
export default function ReviewChangeStatusModal({ objectToEdit, reviewsMutation, isOpen, setIsOpen }) {
    const t = useTranslation();
    React.useEffect(() => {
        if (reviewsMutation.isSuccess || reviewsMutation.isError)
            setIsOpen(false)
    }, [reviewsMutation.isSuccess, reviewsMutation.isError, setIsOpen])
    return (
        <Modal centered isOpen={isOpen} size="md">
            <ModalHeader toggle={() => setIsOpen((v) => !v)}>
                {t("change_review_status")}
            </ModalHeader>
            <ModalBody>
                <ReviewStatusActionController
                    review_status={objectToEdit?.review_status}
                    review_id={objectToEdit?.id}
                    reviewsMutation={reviewsMutation}
                />
            </ModalBody>
        </Modal>
    )
}
