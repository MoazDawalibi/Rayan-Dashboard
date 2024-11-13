import React from "react";
import { Spinner } from "reactstrap";
import CustomCard from "views/components/CustomCard";
import { useTranslation } from "utility/language";
import AuctionDetails from "./AuctionDetails";
import AdditionalImages from "./AdditionalImages";
import {useDeleteAuction, useGetSingleAuction, useUpdateDetailsMutation,useUpdateImages} from 'api/auctions'
import { useParams } from "react-router-dom";

const OneAuctionPage = () => {
  const t = useTranslation();
  const {id}=useParams()
  const { data, isLoading, isSuccess, isError } = useGetSingleAuction(id);
  const updateMutation=useUpdateDetailsMutation();
  const deleteMutation=useDeleteAuction();
  const updateImagesMutation=useUpdateImages();
  const notFound = (isSuccess && data?.auction?.length === 0) ?? false;
  const auction = data?.auction ?? {};

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
        <h3 className="mb-0">{t("_not_found.auction")}</h3>
      </CustomCard>
    );
  }
  return (
    <>
      <AuctionDetails
        auction={auction}
        updateDetailsMutation={updateMutation}
        deleteMutation={deleteMutation}
      
      />
      <AdditionalImages auction={auction} mutation={updateImagesMutation} />
  
    </>
  );
};

export default OneAuctionPage;
