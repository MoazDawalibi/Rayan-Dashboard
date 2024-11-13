import { useState, useEffect } from "react";



export const useGetImageFromLocalStorage = ()=> {
    const defaultValue = localStorage.getItem("customer_image")
    const [preview, setPreview] = useState(defaultValue || null);

 const handleImageChange = (event) => {

    setPreview(URL.createObjectURL(event.target.files[0]));

  };
  


    return {preview , setPreview , handleImageChange} 

}