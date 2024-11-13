import React from "react";
import { useGetAboutUs } from "api/information";

import PageStructure from "views/components/PageStructure";
import AboutUsForm from "./AboutUsForm";

const AboutUsPage = () => {
  const { data, isLoading, isError } = useGetAboutUs();

  const about_us = data?.translations;

  return (
    <PageStructure
      title="about_us"
      data={about_us}
      isLoading={isLoading}
      isError={isError}
    >
      <AboutUsForm about_us={about_us} />
    </PageStructure>
  );
};

export default AboutUsPage;
