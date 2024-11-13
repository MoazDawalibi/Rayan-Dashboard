import { useMemo } from "react";
import { useTranslation } from "utility/language";
// import { history } from "../../../history";
const useTableColumns = (setEditModal, setObjectToEdit) => {
  const t = useTranslation();

  return useMemo(
   
    () => [
      {
        name: t("value"),
        selector: "",
        sortable: false,
        center: true,
      },
      {
        name: t("gift_to"),
        selector: "",
        sortable: false,
        center: true,
      },
      // {
      //   name: "#",
      //   sortable: false,
      //   center: true,
      //   cell: (row) => (
      //     <Actions
      //       onEdit={() => {
      //         setEditModal(true);
      //         setObjectToEdit(row);
      //       }}
      //       onDelete={() => deleteMutation.mutate({ id: row.id })}
      //     />
      //   ),
      // },
    ],
    [t]
  );
};

export default useTableColumns;
