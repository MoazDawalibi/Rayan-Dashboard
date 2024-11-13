import React from "react";
import { useGetConditions } from "api/information";

import PageStructure from "views/components/PageStructure";
import ConditionsForm from "./ConditionsForm";

const ConditionsPage = () => {
  const { data, isLoading, isError } = useGetConditions();
  const conditions = data?.conditions;

  return (
    <PageStructure
      title="conditions"
      data={conditions}
      isLoading={isLoading}
      isError={isError}
    >
      <ConditionsForm conditions={conditions} />
    </PageStructure>
  );
};

export default ConditionsPage;
