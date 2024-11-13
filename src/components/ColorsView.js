import { useGetColors } from 'api/productsColors'
import { mapTranslatedProperties } from 'helpers/language';
import React from 'react'
import { useBackendLanguageCode } from 'utility/language';
import CloseIcon from '@mui/icons-material/Close';
export default function ColorsView({colors,clicked}) {
    const {data}=useGetColors();
    const languageCode=useBackendLanguageCode();


      const options=React.useMemo(()=>{
            let options=[];

            if (data  && Array.isArray(data)) {

                options=data.filter(obj=>colors.some(element =>element===obj.id ))
            }
            
            return options

        },[colors,data])



  return (
    <>
        <div  className="d-flex align-items-center" style={{gap:"5px"}}>
    {
        
        options.map(colOption=><div 
            key={colOption.id}
            className="d-flex align-items-center justify-content-center" 
        style={{padding:"0.8rem", borderRadius:"100%" ,backgroundColor:"#4E8075",color:"#FFF",gap:"5px"}}>
            <p style={{margin:"0"}} 
            
            
            >{mapTranslatedProperties(colOption.color_details, "color_name", languageCode)}</p>
                    <CloseIcon style={{cursor:"pointer"}} onClick={()=>clicked(colOption.id)}/>
            </div>)
    }
        </div>
    </>
  )
}
