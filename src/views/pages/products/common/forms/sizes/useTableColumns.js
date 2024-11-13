import React, { useMemo } from "react";
import { useTranslation } from "utility/language";
import Actions from "components/table/TableActions";
import { useFormikContext } from "formik";


const useTableColumns = () => {
  const t = useTranslation();
  const formik=useFormikContext();
  const sizes=formik.values.sizes;
  return useMemo(
    () => [
    
      {
        name: t("size"),
        sortable: false,
        center: true,
        cell: (row) => <>{row.size}</>,
      },
      {
        name: `${t("price")}`,
        sortable: false,
        center: true,
        cell: (row) => <>{row.price}</>,
    
      },
     
      {
        name: "#",
        sortable: false,
        center: true,
        cell: (row) => (
          <Actions
            showEdit={false}
            onDelete={() => {
                    let newSizes=sizes.filter(obj=>obj.price!==row.price&&obj.size!==row.size)
                    formik.setFieldValue("sizes",newSizes)
            }}  
          />
        ),
      },
    ],
    [t,sizes,formik]
  );
};

export default useTableColumns;
