import React from "react";

import { useParams } from "react-router-dom";

import { ProductTypeProvider, TYPE } from "../common/useProductType";
import ViewOneProductPage from "../common/view-one/ViewOneProductPage";
import {
  useGetSingleProduct,
  useUpdateDetailsMutation,
  useDeleteProduct,
  useUpdateImages,
  useGetOwnerProductComments,
  useGetOwnerProductReviews,
  useUpdateOwnerProductCommentStatus,
  useUpdateOwnerProductReviewsStatus,
} from "api/owner_products";

const ViewOneOwnerProductPage = () => {

 
  const { id } = useParams();
  const query = useGetSingleProduct(id);
  const updateMutation = useUpdateDetailsMutation();
  const deleteMutation = useDeleteProduct();
  const updateImagesMutation = useUpdateImages();
  const commentQuery = useGetOwnerProductComments;
  const reviewsQuery = useGetOwnerProductReviews;
  const commentMuation = useUpdateOwnerProductCommentStatus();
 
  const reviewsMutation = useUpdateOwnerProductReviewsStatus();

  return (
    <ProductTypeProvider productType={TYPE.OWNER_PRODUCT}>
      <ViewOneProductPage
        query={query}
        updateMutation={updateMutation}
        deleteMutation={deleteMutation}
        updateImagesMutation={updateImagesMutation}
        commentQuery={commentQuery}
        reviewsQuery={reviewsQuery}
        commentMuation={commentMuation}
        reviewsMutation={reviewsMutation}

      />
    </ProductTypeProvider>
  );
};

export default ViewOneOwnerProductPage;
