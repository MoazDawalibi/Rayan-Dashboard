import {
  useGetQuery,
  useToggleStatus,
  useDeleteMutation,
  useUploadWithProgress,
  useUpdateMutation
} from "./helpers";

const API = {
  ADD: `/api/admin/owner_product/add`,
  GET_SINGLE_PRODUCT: `/api/admin/owner_product`,
  GET_ALL: `/api/admin/owner_products`,
  UPDATE_STATUS: `/api/admin/owner_product/update_status`,
  UPDATE_DETAILS: `/api/admin/owner_product/update`,
  UPDATE_IMAGES: `/api/admin/owner_product/update_images`,
  DELETE: `/api/admin/owner_product/delete`,
  GET_OWNER_PRODUCT_COMMENTS: `/api/admin/owner_product/comments`,
  UPDATE_OWNER_PRODUCT_COMMENTS: `/api/admin/owner_product/update_comment_status`,
  GET_OWNER_PRODUCT_REVIEWS: `/api/admin/owner_product/reviews`,
  UPDATE_OWNER_PRODUCT_REVIEWS: `/api/admin/owner_product/update_review_status`,
};

const KEY = "OWNER_PRODUCTS";
export const useGetProducts = (params) => useGetQuery(KEY, API.GET_ALL,params);
export const useAddProduct = () => useUploadWithProgress(KEY, API.ADD);
export const useUpdateProductStatus = () =>
  useToggleStatus(KEY, API.UPDATE_STATUS, "product_id", "owner_products");
export const useDeleteProduct = () =>
  useDeleteMutation(KEY, API.DELETE, "product_id", "owner_products");

const SINGLE_PRODUCT_KEY = "SINGLE_OWNER_PRODUCT";
export const useGetSingleProduct = (product_id) =>
  useGetQuery(
    SINGLE_PRODUCT_KEY,
    API.GET_SINGLE_PRODUCT,
    { product_id },
    { enabled: !!product_id }
  );
export const useUpdateDetailsMutation = () =>
  useUploadWithProgress(SINGLE_PRODUCT_KEY, API.UPDATE_DETAILS);
export const useUpdateImages = () =>
  useUploadWithProgress(SINGLE_PRODUCT_KEY, API.UPDATE_IMAGES);
export const useGetOwnerProductComments = (params) => useGetQuery("OWNER_PRODUCT_COMMENTS", API.GET_OWNER_PRODUCT_COMMENTS, { ...params });
export const useUpdateOwnerProductCommentStatus = () => useToggleStatus("OWNER_PRODUCT_COMMENTS", API.UPDATE_OWNER_PRODUCT_COMMENTS, "comment_id", "owner_product_comments")
export const useGetOwnerProductReviews = (params) => useGetQuery("OWNER_PRODUCT_REVIEWS", API.GET_OWNER_PRODUCT_REVIEWS, { ...params });
export const useUpdateOwnerProductReviewsStatus = () => useUpdateMutation("OWNER_PRODUCT_REVIEWS", API.UPDATE_OWNER_PRODUCT_REVIEWS)