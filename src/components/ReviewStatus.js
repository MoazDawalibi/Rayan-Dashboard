import React from "react";
import { Badge } from "reactstrap";
import { useTranslation } from "utility/language";

import PropTypes from "prop-types";

const ReviewStatus = ({ review_status }) => {
   
    const t = useTranslation();
    const all={
        pending:{color:"secondary"},
        accepted:{color:"success"},
        rejected:{color:"danger"},
    
    }
    

    
  return (
        <Badge color={all[review_status].color}>
                {t(review_status)}
        </Badge>
  );
};

ReviewStatus.propTypes = {
    review_status: PropTypes.string.isRequired,
};

export default ReviewStatus;
