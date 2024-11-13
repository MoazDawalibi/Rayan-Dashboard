import React from 'react'
import { Col, Row } from 'reactstrap'
import LatestOrdersTable from './latestOrders/LatestOrdersTable'
import LatestDriverTable from './latestDriver/LatestDriverTable'

export default function Tabels({latest_orders , latest_users}) {
  
  return (
    <Row xs={1} sm={1} md={1} lg={2} xl={2}>
        <Col>
         <LatestDriverTable latest_users={latest_users} />
        </Col>
        <Col>
           <LatestOrdersTable latest_Orders={latest_orders}/>
        </Col>
        {/* <Col>
        <LatestDriverTable latest_users={latest_user}/>
        </Col> */}
    </Row>
  )
}
