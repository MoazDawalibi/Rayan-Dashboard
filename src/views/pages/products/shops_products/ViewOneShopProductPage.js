import React from "react";

import { useParams } from "react-router-dom";

import { ProductTypeProvider, TYPE } from "../common/useProductType";
import ViewOneProductPage from "../common/view-one/ViewOneProductPage";

import {
  useGetSingleProduct,
  useUpdateDetailsMutation,
  useDeleteProduct,
  useUpdateImages,
  useGetShopProductComments,
  useGetShopProductReviews,
  useUpdateShopProductCommentStatus,
  useUpdateShopProductReviewsStatus,
} from "api/shops_products";

const ViewOneShopProductPage = () => {
  const { id, shop_id } = useParams();

  const query = useGetSingleProduct(id, shop_id);
  const updateMutation = useUpdateDetailsMutation();
  const deleteMutation = useDeleteProduct();
  const updateImagesMutation = useUpdateImages();
  const commentQuery = useGetShopProductComments;
  const reviewsQuery = useGetShopProductReviews;
  const commentMuation = useUpdateShopProductCommentStatus();
  const reviewsMutation = useUpdateShopProductReviewsStatus();
  const notChangedQuery=React.useMemo(()=>query,[query])

  return (
    <ProductTypeProvider productType={TYPE.SHOP_PRODUCT}>
      <ViewOneProductPage
        query={notChangedQuery}
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

export default ViewOneShopProductPage;
