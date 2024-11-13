import React from "react";
import { useGetPrivacy } from "api/information";

import PageStructure from "views/components/PageStructure";
import PrivacyForm from "./PrivacyForm";

const PrivacyPage = () => {
  const { data, isLoading, isError } = useGetPrivacy();
  const privacy = data?.translations;
  return (
    <PageStructure
      title="privacy"
      data={privacy}
      isLoading={isLoading}
      isError={isError}
    >
      
      <PrivacyForm privacy={privacy} />
    </PageStructure>
  );
};

export default PrivacyPage;
