import React from "react";
import { Card, CardHeader, CardTitle, CardBody, Button } from "reactstrap";
import { useTranslation } from "utility/language";
import { Formik, Form } from "formik";
import Tabs from "components/Tabs";
import { getInitialValues, getValidationSchema } from "./utils/formSchema";
import { buildFormData } from "api/helpers";
import { LoadingButton } from "components/input/LoadingButton";
import useFormTabs from "./utils/useFormTabs";
import PropTypes from "prop-types";
import useProductType from "./useProductType";
import ProgressBar from "components/ProgressBar";
import { navigateToAllProducts } from "./utils/nav";
import AuthComponent from "components/AuthComponent";

const AddProductPage = ({ mutation, initialValues = {} }) => {
  const t = useTranslation();
  const {
    mutate: addProduct,
    isLoading,
    isSuccess,
    isError,
    percentCompleted,
  } = mutation;
  const productType = useProductType();

  React.useEffect(() => {
    if (isSuccess) {
      navigateToAllProducts(productType);
    }
  }, [isSuccess, productType]);

  const tabs = useFormTabs();

  const handleSubmit = (values) => {
    const formData = new FormData();
    buildFormData(formData, values);
    addProduct(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {t("add_product")} ({t(productType)})
        </CardTitle>
        <Button
          color="primary"
          onClick={() => navigateToAllProducts(productType)}
        >
          {t("back")}
        </Button>
      </CardHeader>
      <CardBody>
        <Formik
          onSubmit={handleSubmit}
          initialValues={{ ...getInitialValues(productType), ...initialValues }}
          validationSchema={getValidationSchema(productType)}
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

AddProductPage.propTypes = {
  mutation: PropTypes.object.isRequired,
};

export default AddProductPage;
