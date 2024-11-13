import React from "react";
import { useGetCompanyInfo } from "api/information";

import PageStructure from "views/components/PageStructure";
import CompanyInfoForm from "./CompanyInfoForm";

const CompanyInfoPage = () => {
  const { data, isLoading, isError } = useGetCompanyInfo();
  const company_info = data?.company_info;

  return (
    <PageStructure
      title="company_info"
      data={company_info}
      isLoading={isLoading}
      isError={isError}
    >
      <CompanyInfoForm company_info={company_info} />
    </PageStructure>
  );
};

export default CompanyInfoPage;
