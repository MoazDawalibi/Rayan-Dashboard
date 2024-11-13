import React, { useMemo } from "react";
import { useTranslation } from "utility/language";
// import { history } from "../../../history";
import { LoadingButton } from "components/input";
import { useFormikContext } from "formik";

const useTableColumnsCustomer = () => {
  const t = useTranslation();
  const formik = useFormikContext( )
  return useMemo(
   
    () => [
      {
        name: t("customer_name"),
        sortable: false,
        center:true,
        selector:""
      },
      {
        name: t("select_customer"),
        sortable: false,
        center:true,
        cell:(row)=>(
            <LoadingButton
            type="submit"
            color="primary"
            onClick={()=> formik.setFieldValue("gift_name" , row.id)}
          >
            {t("select")}
          </LoadingButton>
        )
      }

    ],
    [t ]
  );
};

export default useTableColumnsCustomer;
