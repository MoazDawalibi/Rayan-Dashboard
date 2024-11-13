import { formatToBackend } from "helpers/date";
import {
    useGetQuery,
    useToggleStatus,
    useDeleteMutation,
    useUploadWithProgress,
  } from "./helpers";
  
  const API = {
    ADD: `/api/admin/auction/add`,
    GET_SINGLE_AUCTION: `/api/admin/auction`,
    GET_ALL: `/api/admin/auctions`,
    UPDATE_STATUS: `/api/admin/auction/update_status`,
    UPDATE_DETAILS: `/api/admin/auction/update`,
    UPDATE_IMAGES: `/api/admin/auction/update_images`,
    DELETE: `/api/admin/auction/delete`,

  };
  
  const KEY = "AUCTIONS";
  export const useGetAuctions = () => useGetQuery(KEY, API.GET_ALL);
  export const useAddAuction = () => useUploadWithProgress(KEY, API.ADD);
  export const useUpdateAuctionStatus = () =>
    useToggleStatus(KEY, API.UPDATE_STATUS, "auction_id", "auctions");
  export const useDeleteAuction = () =>
    useDeleteMutation(KEY, API.DELETE, "auction_id", "auctions");
  
  const SINGLE_AUCTION_KEY = "SINGLE_AUCTION";
  export const useGetSingleAuction = (auction_id) =>
    useGetQuery(
      SINGLE_AUCTION_KEY,
      API.GET_SINGLE_AUCTION,
      { auction_id },
      { enabled: !!auction_id }
    );
  export const useUpdateDetailsMutation = () =>
    useUploadWithProgress(SINGLE_AUCTION_KEY, API.UPDATE_DETAILS);
  export const useUpdateImages = () =>
    useUploadWithProgress(SINGLE_AUCTION_KEY, API.UPDATE_IMAGES);
    export const changeSentTime=(values)=>{
        const end_at=formatToBackend(values.end_at);
        const start_at=formatToBackend(values.start_at);
        return {...values,start_at,end_at}}