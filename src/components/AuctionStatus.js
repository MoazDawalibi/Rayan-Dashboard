import React from "react";
import { Badge } from "reactstrap";
import { useTranslation } from "utility/language";

import PropTypes from "prop-types";

const AuctionStatus = ({ auction_status }) => {
    const t = useTranslation();
    const all={
        pending:{color:"secondary"},
        on_going:{color:"success"},
        finished:{color:"danger"}
    }
    

    
  return (
        <Badge color={all[auction_status].color}>
                {t(auction_status)}
        </Badge>
  );
};

AuctionStatus.propTypes = {
    auction_status: PropTypes.string.isRequired,
};

export default AuctionStatus;
