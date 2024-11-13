import React, { useMemo } from "react";
import { useBackendLanguageCode, useTranslation } from "utility/language";
import { history } from "../../../history";
import { baseURL } from "api/config";
import { GrView } from "react-icons/gr";
import Actions from "components/table/TableActions";
import HovarableImage from "components/HovarableImage";
import { MdOutlineBlock } from "react-icons/md";
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import { AiOutlineGift } from "react-icons/ai";
import { useDeleteCustomer, useToggleStatusCustomer } from "api/customer";
import { ToggleStatus } from "./ToggleVerfaction.";

const useTableColumns = (setopenBlockModal,setobjectIDForBlock ,setopenGiftModal,setobjectIDForGift ,setopenunBlockModal , isLoading=true) => {
  const t = useTranslation();
  const languageCode = useBackendLanguageCode();
  const deleteMutation= useDeleteCustomer()
  const  toggleMutation = useToggleStatusCustomer()
  return useMemo(
    () => [
      {
        name: t("image"),
        sortable: false,
        center: true,
        width:'12%',
        cell: (row) => (
          <HovarableImage
            style={{display:"none"}}
            id={`customer_image_${row.id}`}
            src={`${baseURL}${row.image}`}
            width="60"
          />
        ),
      },
      {
        name:t("name"),
        sortable: false,
        center: true,
        // selector:"full_name",
        width:'12%',

        cell:(row)=>{
         return <p>{row.full_name}</p>
        }
       
      },
   
   
     
      {
        name: t("customer_code"),
        // selector: "code",
        center: true,
        width:'12%',
        
        cell:(row)=> row?.code

      },
      {
        name: t("city"),
        selector: "city_name",
        center: true,
        width:'12%',

        cell:(row)=>t(row.city_name)
      },
      {
        name: t("status"),
        sortable: false,
        center: true,
        width:'12%',
        cell: (row) => (
        row.status==='unblocked'?<span style={{color:"white" ,background:"#28c76f" ,width:90, borderRadius:8, padding:'8px', textAlign:'center' , fontSize:10}}>{t(row.status)}</span> :
         <span style={{color:"white" ,background:"red" , borderRadius:8,width:80 , fontSize:10, padding:'8px', textAlign:'center'}}>{t(row.status)}</span>
        ),
      },
      {
        name:t("wallet"),
        sortable: false,
        center: true,
        width:'10%',

        selector:"wallet"
       
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
              <ToggleStatus object={row} toggleMutation={toggleMutation} />
            )
          }
         
          return <p>{t('done')}</p>
        },
      },
      {
        name:t("date_blocking"),
        sortable: false,
        center: true,
        width:"12%",
        selector:"block_timer"
       
      },
      // {
      //   name: "#",
      //   sortable: false,
      //   center: true,
        
      //   cell: (row) => 
      //   { 
      //     // if(isLoading){
      //     //   return <Spinner/> 
      //     // }
      //     return (
     
      //   )}
      // },
    ],
  
    [
      t,
      languageCode,
    ]
  );
};

export default useTableColumns;
