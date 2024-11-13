import React from "react";
import { Tooltip } from "reactstrap";
import { useTranslation } from "utility/language";

const tooltipStyle = {
  backgroundColor: "white",
  border: "2px solid lightgrey",
  maxWidth: "400px",
};
const ImagePreview = ({ preview,id,height = 200 }) => {
  const t = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  const ID = `image_hover_tooltip_${id}`;
  const toggleTooltip = React.useCallback(() => setIsOpen((prev) => !prev), []);


  return (
    <div
      style={{
        border: "1px solid lightgray",
        height: `${height}px`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Tooltip
        placement="left"
        isOpen={isOpen}
        target={ID}
        toggle={toggleTooltip}
        style={tooltipStyle}
      >
        <img
          style={{ width:"400px", height:'400px' , maxHeight:'450px', maxWidth:"450px"}}
          src={preview}
         
        />
      </Tooltip>
      
      {preview ? (
        <img
          className="p-1"
          style={{
            maxWidth: "100%",
          }}
          id={ID}
          height={height}
          src={preview}
          alt=""
        />
      ) : (
        <div>{t("image_preview")}</div>
      )}
    </div>
  );
};

export default ImagePreview;
