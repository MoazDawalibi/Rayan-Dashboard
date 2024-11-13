import React from "react";
//import LanguageBasedForm from "../forms/LanguageBasedForm";
//import DetailsForm from "../forms/DetailsForm";
//import AdditionalImagesForm from "../forms/AdditionalImagesForm";
import { MdLanguage } from "react-icons/md";
import { BsInfoCircle, BsImages } from "react-icons/bs";
import { useTranslation } from "utility/language";
import {HiOutlineInformationCircle} from "react-icons/hi"
//import AuctionDescriptionForm from "../forms/AuctionDescriptionForm";
import BasicInfo from "./driver_tabs/BasicInfo";
import DriverOrder from "./driver_tabs/DriverOrder";
import AdditionalCarInfo from "./driver_tabs/AdditionalCarInfo";
import AdditionalDriverInfo from "./driver_tabs/AdditionalDriverInfo";
import { useGetDriverOrder} from "api/driver";
const useFormTabs = (images) => {
  const t = useTranslation();
  return  [
    {
      title: (
        <>
          <MdLanguage size={20} /> {t("basic_info")}
        </>
      ),
     content:<BasicInfo /> 
    },
    {
      title: (
        <>
          <HiOutlineInformationCircle size={20} /> {t("additional_car_info")}
        </>
      ),
      content:<AdditionalCarInfo images={images} /> 
    },
    {
      title: (
        <>
          <HiOutlineInformationCircle size={20} /> {t("additional_driver_info")}
        </>
      ),
      content:<AdditionalDriverInfo images={images} /> 
    },
    {
      title: (
        <span>
          <BsInfoCircle size={20} /> {t("driver_order")}
        </span>
      ),
      content :<DriverOrder /> 
    }

  ]
   
   
  
  
};

export default useFormTabs;
