import React from "react";
import { Card, CardHeader, Button, CardTitle, CardBody } from "reactstrap";
import { useTranslation } from "utility/language";
import { history } from '../../../../history'
import { Rating } from "react-simple-star-rating";
import { useCancelOrder, useGetSingleOrder } from "api/orders";
import { useParams } from "react-router-dom";
import SpinnerComponent from "components/@vuexy/spinner/Fallback-spinner";
import { useJsApiLoader } from '@react-google-maps/api';
import GoogleMaps from "./GoogleMap";
import './OrderInfo.css'
import { AiOutlinePhone, AiOutlineUser } from "react-icons/ai";
import { FaRedRiver } from "react-icons/fa";
import { HiQrcode } from "react-icons/hi";
import { MdOutlinePaid } from "react-icons/md";
import { AddButton } from "components/AddButton";
import { LoadingButton } from "components/input";


const SingleOrderPage = () => {


  const t = useTranslation();
  const { id } = useParams()
  const { data, isLoading } = useGetSingleOrder({ order_id: id })
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDZrGqtL1iBm9ZOTdfT-vW-3wpV-LO608M",
    libraries: ['places']
  })

  const {mutate , isLoading:LoadingCancelORder} = useCancelOrder()

  if (isLoading || !isLoaded) {
    return <SpinnerComponent />
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          {t("order_information")}
        <div>
        <LoadingButton 
         isLoading={LoadingCancelORder}
         
           color="danger" style={{backgroundColor:"danger" , color:"white" , marginInline:"10px" , display:data?.status == 'canceled' || data?.status == 'complete'  ? 'none':"inline"  }}
            onClick={()=>mutate({order_id:id})}

          >
            {t('cancel')}
          </LoadingButton>

        <Button
            onClick={() => history.goBack()}
            color="primary"
          >
            {t("back")}
          </Button>
        
        </div>
        </CardTitle>
      </CardHeader>
      <CardBody>
        <div>
          <div style={{ display: "flex", justifyContent: 'space-between', margin: '0px 0px 30px 0' }}>
            <span >
              {/* Order Code  */}
              <h4 style={{ color: "black" }}>{t('order_code')}: <p style={{ display: "inline", color: "black" }}>{data?.code}</p> </h4>

              {/* Order Status  */}
              <h4 style={{ display: "flex", color: 'black' , alignItems:"center"  , marginTop:"20px" , marginBottom:"20px" , justifyContent:"space-around"}}>
                {t('order_status')}
                :
                 <Button className="button-order" color={data?.status === "pending" ? "secondary" : data?.status === 'canceled' ? 'danger' : 'success'}  style={{borderRadius: 5, color: "white", marginInline:"20px"}}>{(data?.status)}</Button>

              </h4>

              <span style={{ color: 'black' }}>{t('driver_order_rate')} :<Rating initialValue={data?.rate} size={23} readonly={true} /> </span>
            </span>
          </div>
          <div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }} className="single-order-info">

          <div style={{ width: "40%" }}>
            <h2 style={{ color: "#626262", fontSize: "20px", textAlign: "center" }}>{t("personal_information")}</h2>
            <div style={{ border: '1px solid #8328f29c', padding: '8px 20px', width: '100%', borderRadius: "10px", marginInline: 5, boxShadow: " 2px 1px 3px #8328f29c" }}>
              <span className="text-order-container"><p className="text-order-display"><FaRedRiver size={17} /> {t('driver_name')}</p><span>{data?.driver_name}</span></span >
              <span className="text-order-container"><p className="text-order-display"><AiOutlinePhone size={17} />{t('driver_phone')}</p><span>{data?.driver_phone}</span></span >
              <span className="text-order-container"><p className="text-order-display"><HiQrcode size={17} />{t('driver_code')}</p><span>{data?.driver_code}</span></span >
              <span className="text-order-container"><p className="text-order-display"><AiOutlineUser size={17} />{t('user_name')}</p><span>{data?.user_name}</span></span >
              <span className="text-order-container"><p className="text-order-display"><AiOutlinePhone size={17} />{t('user_phone')}</p><span>{data?.user_phone}</span></span >
              <span className="text-order-container"><p className="text-order-display"><HiQrcode size={17} />{t('user_code')}</p><span>{data?.user_code}</span></span >
              <span className="text-order-container"><p className="text-order-display"><MdOutlinePaid size={17} />{t('paid_type')}</p><span>{data?.payment_method}</span></span >

            </div>
          </div>
          <div style={{ width: "40%", background: "" }}>
            <h2 style={{ color: "#626262", fontSize: "20px", textAlign: "center" }}>{t("trip_information")}</h2>
            <div style={{ border: '1px solid #8328f29c', padding: '8px 20px', width: '100%', borderRadius: "10px", marginInline: 5, boxShadow: " 2px 1px 3px #8328f29c" }}>
              <span className="text-order-container"><p className="text-order-display">{t('start_point')}</p><span>{data?.place_from}</span></span >
              <span className="text-order-container"><p className="text-order-display">{t('end_point')}</p><span>{data?.place_to}</span></span >
              <span className="text-order-container"><p className="text-order-display">{t('money_received')}</p><span>{parseFloat((data?.real_cost) || 0) + parseFloat(data?.cash_remaining || 0)}</span></span >
              <span className="text-order-container"><p className="text-order-display">{t('start_time_trip')}</p><span>{data?.start_tripe_date}</span></span >
              <span className="text-order-container"><p className="text-order-display">{t('end_time_trip')}</p><span>{data?.end_tripe_date}</span></span >
              <span className="text-order-container"><p className="text-order-display">{t('distance_per_km')} </p><span>{data?.distance}</span></span >
              <span className="text-order-container"><p className="text-order-display">{t('time_per_m')}</p><span>{data?.trip_duration}</span></span >



            </div>
          </div>


        </div>
        {
          data && <GoogleMaps data={data} />
        }

      </CardBody>
    </Card>
  );
};

export default SingleOrderPage;





