import React from "react";
import { useTranslation } from "utility/language";
import classes from "./Vendor.module.scss";
import { IoMdOpen } from "react-icons/io";

import { history } from "../../../../history";

import AuthComponent from "components/AuthComponent";

const VendorDetails = ({ vendor }) => {
  const t = useTranslation();

  if (!vendor || !vendor?.user) {
    return null;
  }

  const navToAccount = () => {
    const { user, ...vendorData } = vendor;
    history.push("/accounts/edit", {
      ...vendorData,
      ...user,
    });
  };
  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <h3>{t("vendor")}</h3>
        <AuthComponent>
          <p onClick={navToAccount} className={classes.edit}>
            {t("view")} <IoMdOpen />
          </p>
        </AuthComponent>
      </div>
      <p className="mb-0">
        {/* {t("full_name")}: <strong>{vendor?.user?.full_name}</strong> */}
      </p>
      <p className="mb-0">
        {t("email")}: <strong>{vendor.user.email}</strong>
      </p>
      <p className="mb-0">
        {t("phone")}: <strong>{vendor.user.phone}</strong>
      </p>
    </div>
  );
};

export default VendorDetails;
