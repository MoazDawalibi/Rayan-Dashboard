import React from 'react'
import { Card, CardBody, CardHeader } from 'reactstrap'
import useProductTabs from '../utils/useProductTabs'
import Tabs from "components/Tabs";
import { useTranslation } from 'utility/language';

export default function ProductTabs(
    {
        commentQuery,
        reviewsQuery,
        commentMuation,
        reviewsMutation,

    }
) {
    const tabs = useProductTabs(
        commentQuery,
        reviewsQuery,
        commentMuation,
        reviewsMutation,


    );
    const t = useTranslation();
    return (
        <Card>
            <CardHeader>
                {t("comments_and_reviews")}
            </CardHeader>
            <CardBody>
                <Tabs tabs={tabs} />
            </CardBody>
        </Card>
    )
}
