import React from "react";
import { Badge } from "reactstrap";
import { useTranslation } from "utility/language";

import PropTypes from "prop-types";

const AuctionOrderStatus = ({ auction_order_status }) => {
    const t = useTranslation();
    const all={
        pending_payment:{color:"secondary"},
        pending:{color:"secondary"},
        accepted:{color:"success"},
        delivering:{color:"primary"},
        delivered:{color:"success"},
        canceled:{color:"danger"}
    }
    

    
  return (
        <Badge color={all[auction_order_status].color}>
                {t(auction_order_status)}
        </Badge>
  );
};

AuctionOrderStatus.propTypes = {
    auction_order_status: PropTypes.string.isRequired,
};

export default AuctionOrderStatus;
