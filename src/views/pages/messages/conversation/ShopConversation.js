import React from 'react'
import { useTranslation } from 'utility/language';
import classes from './Style.module.scss';
import ChatWidget from 'components/@vuexy/chatWidget/ChatWidget';
import { StatusCard } from 'components/StatusCard';
export default function ShopConversation({data,mutation,selectedVendor,isLoading=false,clicked,vendorName}) {
    const t=useTranslation();
    
    if(!selectedVendor){
        return(<>
           <div className={classes.selectContainer}>
            <h1 className={classes.title}>
                {t("please_select_vendor")}
            </h1>
            </div> 
        </>)
    }
    if(isLoading){
        return <StatusCard isLoading={isLoading} />
    }
  return (
        <ChatWidget mutation={mutation} vendorName={vendorName} vendor={selectedVendor} conversation={data}   send={clicked}/>
  )
}
