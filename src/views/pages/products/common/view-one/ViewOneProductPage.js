import React from "react";
import { Spinner } from "reactstrap";
import CustomCard from "views/components/CustomCard";
import { useTranslation } from "utility/language";
import ProductDetails from "./ProductDetails";
import AdditionalImages from "./AdditionalImages";
// import ProductTabs from "./ProductTabs";

const ViewOneProductPage = ({
  query,
  updateMutation,
  deleteMutation,
  updateImagesMutation,
  commentQuery,
  reviewsQuery,
  commentMuation,
  reviewsMutation,

}) => {
  const t = useTranslation();
  const { data, isLoading, isSuccess, isError } = query;
  const notFound = (isSuccess && data?.product?.length === 0) ?? false;
  const product = data?.product ?? {};

  if (isLoading) {
    return (
      <CustomCard>
        <Spinner color="primary" size="lg" />
      </CustomCard>
    );
  }
  if (isError) {
    return (
      <CustomCard>
        <h3 className="mb-0">{t("an_error_occured")}</h3>
      </CustomCard>
    );
  }
  if (notFound) {
    return (
      <CustomCard>
        <h3 className="mb-0">{t("_not_found.product")}</h3>
      </CustomCard>
    );
  }
  return (
    <>
      <ProductDetails
        product={product}
        updateDetailsMutation={updateMutation}
        deleteMutation={deleteMutation}
        commentQuery={commentQuery}
        reviewsQuery={reviewsQuery}
        commentMuation={commentMuation}
        reviewsMutation={reviewsMutation}
      />
      <AdditionalImages product={product} mutation={updateImagesMutation} />
      {/* <ProductTabs
        commentQuery={commentQuery}
        reviewsQuery={reviewsQuery}
        commentMuation={commentMuation}
        reviewsMutation={reviewsMutation}

      /> */}
    </>
  );
};

export default ViewOneProductPage;
