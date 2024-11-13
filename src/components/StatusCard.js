import React from "react";
import { Card, CardBody, Spinner } from "reactstrap";

export const StatusCard = ({ isLoading, isError }) => {
  return (
    <Card>
      <CardBody
        className="d-flex align-items-center justify-content-center"
        style={{ height: "15rem" }}
      >
        {isLoading && <Spinner size="lg" color="primary" />}
        {isError && <h4>Failed !</h4>}
      </CardBody>
    </Card>
  );
};
