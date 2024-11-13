import React from "react";
import { Card, CardHeader, CardTitle, CardBody, Button } from "reactstrap";
import { useTranslation } from "utility/language";
import { Formik, Form } from "formik";
import Tabs from "components/Tabs";
import { getInitialValues, getValidationSchema } from "./utils/formSchema";

import { buildFormData } from "api/helpers";
import { LoadingButton } from "components/input/LoadingButton";

import useFormTabs from "./utils/useFormTabs";
import { history } from "../../../history";

import ProgressBar from "components/ProgressBar";

import AuthComponent from "components/AuthComponent";
import { changeSentTime, useAddAuction } from "api/auctions";

const AddAuctionPage = () => {
  const t = useTranslation();
  const mutation=useAddAuction();
  const {
    mutate: addAuction,
    isLoading,
    isSuccess,
    isError,
    percentCompleted,
  } = mutation;

  React.useEffect(() => {
    if (isSuccess) {
        history.push('/auctions/all')
    }
  }, [isSuccess]);

  const tabs = useFormTabs();

  const handleSubmit = (values) => {
      const newValues=changeSentTime(values);
    const formData = new FormData();
    buildFormData(formData, newValues);
    addAuction(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {t("add_auction")}
        </CardTitle>
        <Button
          color="primary"
          onClick={() => history.push('/auctions/all')}
        >
          {t("back")}
        </Button>
      </CardHeader>
      <CardBody>
        <Formik
          onSubmit={handleSubmit}
          initialValues={ getInitialValues()}
          validationSchema={getValidationSchema()}
        >
          {(formik) => (
            <Form>
              <Tabs tabs={tabs} />

              <AuthComponent>
                <ProgressBar
                  value={percentCompleted}
                  isLoading={isLoading}
                  isError={isError}
                  isSuccess={isSuccess}
                />
                <div className="d-flex justify-content-center align-items-center">
                  <LoadingButton
                    type="submit"
                    color="primary"
                    isLoading={isLoading}
                  >
                    {t("add")}
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


export default AddAuctionPage;
