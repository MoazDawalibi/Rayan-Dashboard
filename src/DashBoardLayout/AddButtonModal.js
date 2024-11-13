import React from "react";
import { useTranslation } from "utility/language";
import { Button } from "reactstrap";
import { Plus } from "react-feather";
import { useStatePage } from "./stateMangment/state";
 
export const AddButtonModal = ({ children, ...props }) => {
  const t = useTranslation();
  const  {setIsOpenAddModel} = useStatePage(state => state)

  return (
    <Button
    onClick={()=>setIsOpenAddModel()}
      color="primary"
      {...props}
      className={`px-1 ${props.className ?? ""}`}
    >
      <Plus size={15} />
      <span style={{ marginLeft: "1px", marginRight: "1px" }}>
        {children || t("add")}
      </span>
    </Button>
  );
};
