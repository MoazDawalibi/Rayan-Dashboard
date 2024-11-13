import React from 'react'
import { Col, Row } from 'reactstrap'
import SingleLangEditor from 'views/pages/information/SingleLangEditor'

export default function AuctionDescriptionForm() {
    return (
        <Row xs={1} sm={1} md={1} lg={2} xl={2}>
            <Col>
                <SingleLangEditor langCode={1} property="auction_description" />
            </Col>
            <Col>
                <SingleLangEditor langCode={2} property="auction_description" />

            </Col>
        </Row>
    )
}
