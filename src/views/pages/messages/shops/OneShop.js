import React from 'react'
import {useBackendLanguageCode} from 'utility/language/useLanguageCode'
import { mapTranslatedProperties } from 'helpers/language';
import { baseURL } from 'api/config';
import classes from './Style.module.scss';
export default function OneShop({active,shop,clicked}) {
const code=useBackendLanguageCode();

  return (
    <div   onClick={()=>clicked(shop)} className={active?classes.oneShopUpperContainerActive:classes.oneShopUpperContainer}>

    <div className={classes.OneshopContainer}

    >
        <div className={classes.imageCon}>
        <img className={classes.image} 

        src={`${baseURL}${shop?.shop_image}`} alt="shop_image"/>
        </div>
        <p className={classes.title}>{mapTranslatedProperties(shop.shop_details,"shop_name",code)}</p>
      
    </div>
    {
          shop.vendor.unread_messages>0 &&!active&&<p className={classes.unreadMessages}>{shop.vendor.unread_messages}</p>
        }
    </div>
  )
}
