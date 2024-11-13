import React, { useMemo } from "react";
import { useTranslation } from "utility/language";
// import { history } from "../../../history";

import { LoadingButton } from "components/input";
import { useFormikContext } from "formik";

const useTableColumnsDriver = () => {
  const t = useTranslation();
const formik = useFormikContext()
  return useMemo(
   
    () => [
      {
        name: t("driver_name"),
        sortable: false,
        center:true,
        selector:""
      },
      {
        name: t("select_driver"),
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
    [t , formik]
  );
};

export default useTableColumnsDriver;
