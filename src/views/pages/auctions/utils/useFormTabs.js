import React from "react";
import LanguageBasedForm from "../forms/LanguageBasedForm";
import DetailsForm from "../forms/DetailsForm";
import AdditionalImagesForm from "../forms/AdditionalImagesForm";
import { MdLanguage } from "react-icons/md";
import { BsInfoCircle, BsImages } from "react-icons/bs";
import { useTranslation } from "utility/language";
import AuctionDescriptionForm from "../forms/AuctionDescriptionForm";
import DescriptionIcon from '@mui/icons-material/Description';

const useFormTabs = (editMode = false) => {
  const t = useTranslation();
  const [images, setImages] = React.useState([]);

  return React.useMemo(() => {
    const tabs = [
      {
        title: (
          <>
            <MdLanguage size={20} /> {t("basic_info")}
          </>
        ),
        content: <LanguageBasedForm editMode={editMode} />,
      },
      {
        title: (
          <>
            <BsInfoCircle size={20} /> {t("auction_details")}
          </>
        ),
        content: <DetailsForm editMode={editMode} />,
      },
      {
        title: (
          <>
            <DescriptionIcon size={20} /> {t("auction_description")}
          </>
        ),
        content: <AuctionDescriptionForm />,
      },



    ];
    if (!editMode) {
      tabs.push({
        title: (
          <>
            <BsImages size={20} /> {t("additional_images")}
          </>
        ),
        content: (
          <AdditionalImagesForm
            editMode={editMode}
            images={images}
            setImages={setImages}
          />
        ),
      });
    }
   
    return tabs;
  }, [t, editMode, images]);
};

export default useFormTabs;
