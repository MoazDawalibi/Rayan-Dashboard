import React from "react";

import PropTypes from "prop-types";
import { baseURL } from "api/config";
import StatusBadge from "components/StatusBadge";
import { useBackendLanguageCode } from "utility/language";

import { mapTranslatedProperties } from "helpers/language";
import VendorDetails from "./vendor/VendorDetails";

import { Button } from "reactstrap";
import { useTranslation } from "utility/language";
import { history } from "../../../history";

const ShopDetailsContent = ({ shop }) => {
  const languageCode = useBackendLanguageCode();
  const t = useTranslation();

  const { shop_name, shop_image, is_active } = React.useMemo(
    () => ({
      shop_name: mapTranslatedProperties(
        shop.shop_details,
        "shop_name",
        languageCode
      ),
      ...shop,
    }),
    [shop, languageCode]
  );
  return (
    <div className="d-flex flex-wrap" style={{ gap: "2em" }}>
      <img
        style={{
          maxWidth: "15rem",
          objectFit: "contain",
          border: "1px solid lightgray",
          padding: "1rem",
          borderRadius: "8px",
        }}
        src={baseURL + shop_image}
        alt={shop_name}
      />
      <div style={{ flexGrow: 1 }}>
        <div className="d-flex align-items-center justify-content-between flex-wrap">
          <div className="d-flex align-items-center">
            <h1 className="mr-1 mb-0">{shop_name}</h1>
            <StatusBadge status={is_active} />
          </div>

          <Button color="primary" onClick={() => history.push(`/shops`)}>
            {t("back")}
          </Button>
        </div>
        <hr />
        <VendorDetails vendor={shop.vendor} />
      </div>
    </div>
  );
};

ShopDetailsContent.propTypes = {
  shop: PropTypes.object.isRequired,
};

export default ShopDetailsContent;
