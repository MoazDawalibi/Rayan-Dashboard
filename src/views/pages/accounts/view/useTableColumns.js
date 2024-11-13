import React, { useMemo } from "react";
import { useDeleteAccount } from "api/accounts";
import { useTranslation } from "utility/language";
import { history } from "../../../../history";

import Actions from "components/table/TableActions";
import { RiLockPasswordFill } from "react-icons/ri";

const useTableColumns = (setEditPasswordModal  ,setObjectToEdit) => {
  const t = useTranslation();
  const deleteMutation = useDeleteAccount();

  return useMemo(
    () => [

      {
        name: t("full_name"),
        selector: "full_name",
        sortable: true,
        center: true,
        // cell: (row) => <>{row.full_name}</>,
      },
      {
        name: t("role"),
        sortable: true,
        center: true,
        cell: (row) => {
          
          return (row.roles?.name)
        }
      },

      {
        name: t("email"),
        selector: "email",
        sortable: true,
        center: true,
        // cell: (row) => <>{row.email}</>,
      },
      {
        name: t("phone"),
        selector: "phone",
        sortable: true,
        center: true,
        // cell: (row) => <div dir="ltr">{row.phone}</div>,
      },
      {
        name: "#",
        sortable: false,
        center: true,
        cell: (row) => {
         
          return (
         <>
          <Actions
                onEdit={() => history.push("/accounts/edit", row)}
                onDelete={() => deleteMutation.mutate({id:row.id })}
              />
              <RiLockPasswordFill
              onClick={() => {
                setEditPasswordModal(true);
                setObjectToEdit(row);
              }}
              className="cursor-pointer ml-1"
              size={22}
            />
         </>
          )
        }
         
      
      },
    ],
    [t, deleteMutation]
  );
};

export default useTableColumns;
