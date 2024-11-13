import React from "react";
import { Card, CardHeader, Button, CardTitle, CardBody } from "reactstrap";
import { useTranslation } from "utility/language";
import { Formik, Form } from "formik";
import Tabs from "components/Tabs";
import { getInitialValues, getValidationSchema } from "../utils/formSchema";
import useFormTabs from "../utils/useFormTabs";
import { LoadingButton } from "components/input/LoadingButton";

import { buildFormData } from "api/helpers";
import confirmAlert from "extensions/confirm-alert";
import { useTranslatedLabels } from "extensions/confirm-alert/useTranslatedLabels";
import {history} from '../../../../history'

import ProgressBar from "components/ProgressBar";

import AuthComponent from "components/AuthComponent";

const AuctionDetails = ({ auction, updateDetailsMutation, deleteMutation}) => {
  const t = useTranslation();
  const confirmOptions = useTranslatedLabels();
  const tabs = useFormTabs(true);

  

  React.useEffect(() => {
    if (deleteMutation.isSuccess) {
      history.push('/auctions/all')
    }
  }, [deleteMutation.isSuccess]);

  const handleDelete = () => {
    confirmAlert({
      onConfirm: () => {
        deleteMutation.mutate({
          id: auction.id,
        });
      },
      ...confirmOptions,
    });
  };

  const handleSubmit = (values) => {
    const formData = new FormData();
    buildFormData(formData, {auction_id:auction.id, ...values });
    updateDetailsMutation.mutate(formData);
  };

  return (
    <Card>
      <CardHeader className="d-flex justify-content-between align-items-center">
        <CardTitle>
          {t("edit_auction")}
        </CardTitle>
        <div
          className="d-flex align-items-center flex-wrap"
          style={{ gap: "1em" }}
        >
          <Button
            onClick={() =>  history.push('/auctions/all')}
            color="primary"
          >
            {t("back")}
          </Button>
          <AuthComponent>
            <LoadingButton
              color="danger"
              isLoading={deleteMutation.isLoading}
              onClick={handleDelete}
            >
              {t("delete")}
            </LoadingButton>
          </AuthComponent>
        </div>
      </CardHeader>
      <CardBody>
        <Formik
          validationSchema={getValidationSchema( true)}
          onSubmit={handleSubmit}
          initialValues={getInitialValues(auction)}
        >
          {(formik) => (
            <Form>
              <Tabs tabs={tabs} />

              <AuthComponent>
                <ProgressBar
                  value={updateDetailsMutation.percentCompleted}
                  isLoading={updateDetailsMutation.isLoading}
                  isError={updateDetailsMutation.isError}
                  isSuccess={updateDetailsMutation.isSuccess}
                />
                <div className="d-flex justify-content-center align-items-center">
                  <LoadingButton
                    type="submit"
                    color="primary"
                    isLoading={updateDetailsMutation.isLoading}
                  >
                    {t("save")}
                  </LoadingButton>
                </div>
              </AuthComponent>
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
};

export default AuctionDetails;
