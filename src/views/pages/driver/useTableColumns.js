import React, { useMemo } from "react";

import { useBackendLanguageCode, useTranslation } from "utility/language";
import { baseURL } from "api/config";

import Switch from "react-switch";
import HovarableImage from "components/HovarableImage";
import { useAcceptedDriver, useDeleteDriver, useToggleStatusDriver } from "api/driver";
import { Spinner } from "reactstrap";
import { ToggleStatus } from "components/ToggleStatus";

const useTableColumns = (setopenBlockModal,setobjectIDForBlock ,setopenGiftModal,setobjectIDForGift ,setopenunBlockModal) => {
  const t = useTranslation();
  const deleteMutation = useDeleteDriver();
  const toggleMutation = useAcceptedDriver();
  const languageCode = useBackendLanguageCode();
  const toggleMutation2= useToggleStatusDriver()
  const handleChange = (checked)=> {
    toggleMutation.mutate({driver_id:checked})
    
  }
  return useMemo(
    () => [
      {
        name: t("image"),
        sortable: false,
        center: true,
        width:'6%',

        cell: (row) => (
          <HovarableImage
            id={`driver_image_${row?.id}`}
            src={`${baseURL}${row?.image}`}
            width="35"
          />
        ),
      },
      {
        name:t("name"),
        sortable: false,
        center: true,
        // width:"89px",
       
       
        cell:(row)=> row?.full_name,
        width:'12%',
      },
    
      {
        name: t("driver_code"),
        selector: "code",
        center: true,
        
        width:'12%',

      },
      {
        name:t("wallet"),
        sortable: false,
        center: true,
        cell:(row)=> row?.wallet,
        // width:'12%',

       
      },
      {
        name:t("city"),
        sortable: false,
        center: true,
        // width:'12%',
        
        cell:(row)=>t(row?.city_name)       
      },
      {
        name: t("status"),
        sortable: false,
        width:"100px",

        center: true,
        cell: (row) => {
          if(toggleMutation?.isLoading && row?.status === 'pending'){
            return <Spinner color="primary"/>  
          }
         if(!(row.status ==='pending')){
          return <span style={{color:"white" , background:row.status ==='online'?"#19ab27": 'red' , padding:"10px", width:80  ,fontSize:10  , borderRadius:12, textAlign:"center" }}>{t(row.status)}</span>
         }
          return (
            <div>
              <p style={{margin:"0"}}>{t('pending')}</p>
            <label>
          <Switch onChange={()=>handleChange(row.id)} checked={false} />
           </label>
            </div>
          )
          
        },
        
      
      },
      {
        name: t("phone_verfication"),
        sortable: false,
        center: true,
        width:'8%',

        cell: (row) => {

          row['is_active'] =false

          if(row?.phone_verfication == 0){
            return (
              <ToggleStatus object={row} toggleMutation={toggleMutation2} />
            )
          }
         
          return <p>{t('done')}</p>
        },
      },
      {
        name: t("date_blocking"),
        selector: "block_timer",
        width:'12%',

        center: true,
      },
      // {
      //   name: "#",
      //   sortable: false,
      //   center: true,
      //   cell: (row) =>{ 
         
      //     return (
        
      //   )},
      // },
    ],
    [
      t,
      
      deleteMutation,
      toggleMutation,
      languageCode,
    ]
  );
};

export default useTableColumns;
