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

import useProductType from "../useProductType";
import { navigateToAllProducts } from "../utils/nav";
import ProgressBar from "components/ProgressBar";

import AuthComponent from "components/AuthComponent";

const ProductDetails = ({ product, updateDetailsMutation, deleteMutation, commentQuery
  ,reviewsQuery,
  commentMuation,
  reviewsMutation }) => {
  const t = useTranslation();
  const confirmOptions = useTranslatedLabels();
  const tabs = useFormTabs(true,commentQuery
    ,reviewsQuery,
    commentMuation,
    reviewsMutation,product);

  const productType = useProductType();

  React.useEffect(() => {
    if (deleteMutation.isSuccess) {
      navigateToAllProducts(productType);
    }
  }, [deleteMutation.isSuccess, productType]);

  const handleDelete = () => {

    
    confirmAlert({
      onConfirm: () => {
        deleteMutation.mutate({
          id:product.id
          
        });
      },
      ...confirmOptions,
    });
  };

  const handleSubmit = (values) => {
    const formData = new FormData();
    buildFormData(formData, { product_id: product.id, ...values });
    updateDetailsMutation.mutate(formData);
  };

  return (
    <Card>
      <CardHeader className="d-flex justify-content-between align-items-center">
        <CardTitle>
          {t("edit_product")} ({t(productType)})
        </CardTitle>
        <div
          className="d-flex align-items-center flex-wrap"
          style={{ gap: "1em" }}
        >
          <Button
            onClick={() => navigateToAllProducts(productType)}
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
          validationSchema={getValidationSchema(productType, true)}
          onSubmit={handleSubmit}
          initialValues={getInitialValues(productType, product)}
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

export default ProductDetails;
