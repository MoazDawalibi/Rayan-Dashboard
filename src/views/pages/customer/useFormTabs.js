import React from "react";
//import LanguageBasedForm from "../forms/LanguageBasedForm";
//import DetailsForm from "../forms/DetailsForm";
//import AdditionalImagesForm from "../forms/AdditionalImagesForm";
import { MdLanguage } from "react-icons/md";
import { BsInfoCircle, BsImages } from "react-icons/bs";
import { useTranslation } from "utility/language";
//import AuctionDescriptionForm from "../forms/AuctionDescriptionForm";
import DescriptionIcon from '@mui/icons-material/Description';
import CustomerForm from "./CustomerForm";

const useFormTabs = (editMode = false) => {
  const t = useTranslation();
  const [images] = React.useState([]);

  return React.useMemo(() => {
    const tabs = [
      {
        title: (
          <>
            <MdLanguage size={20} /> {t("basic_info")}
          </>
        ),
       //content: <LanguageBasedForm editMode={editMode} />,
       content:<CustomerForm /> 
      },

    ];
   
    return tabs;
  }, [t, editMode, images]);
};

export default useFormTabs;
