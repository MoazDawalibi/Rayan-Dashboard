import React from 'react'
import { Col, Row } from 'reactstrap'
import { StatusCard } from "components/StatusCard";
import Shops from './shops/Shops';
import ShopConversation from './conversation/ShopConversation';
import { useAddMessage, useGetMessages, useUpdateMessageStatus } from 'api/messages';
import { useGetVendors } from 'api/vendors';
import { mapTranslatedProperties } from 'helpers/language';
import { useBackendLanguageCode } from 'utility/language';


export default function MessagesPage() {
   
    const [selectedVendor,setSelectedVendor]=React.useState("");
    const [vendorName,setVendorName]=React.useState("");
    const {data,isLoading,isError,refetch}=useGetVendors();
    const statusMutation=useUpdateMessageStatus();

    
   
    const {data:messages,isLoading:messagesIsLoading}=useGetMessages({
        vendor_id:selectedVendor
    });
    React.useEffect(()=>{
        if(statusMutation.isSuccess){
            refetch();
        }
    },[statusMutation.isSuccess,refetch])
    const mutation=useAddMessage();
    const lang=useBackendLanguageCode()

    if(!data){
        return <StatusCard isLoading={isLoading} isError={isError}/>
    }

    const handleShopClicked=(vendor)=>{
        setSelectedVendor(vendor.vendor.user_id);
        setVendorName(mapTranslatedProperties(vendor.shop_details,"shop_name",lang))
        statusMutation.mutate({vendor_id:vendor.vendor.user_id})

    }
    const handleSendMessage=(data)=>{
            mutation.mutate(data)
    }
    const messagesData=messages?messages :[];
   
  return (
    <Row  >
        <Col xs="3.5">
        <Shops selectedVendor={selectedVendor} data={data?data:[]} ClickedShop={handleShopClicked}/>

        </Col>
        <Col >
        <ShopConversation vendorName={vendorName} selectedVendor={selectedVendor}  isLoading={messagesIsLoading }  data={messagesData} mutation={mutation} clicked={handleSendMessage}/>

        </Col>
    </Row>
  )
}


