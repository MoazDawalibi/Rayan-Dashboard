import React, { useMemo } from "react";
import { useTranslation } from "utility/language";
import { useDeleteUser } from "api/users";
import Actions from "components/table/TableActions";
import { RiLockPasswordFill } from "react-icons/ri";
import { GoVerified } from "react-icons/go";

const useTableColumns = ({
  setEditModal,
  setObjectToEdit,
  setEditPasswordModal,
}) => {
  const t = useTranslation();
  const deleteMutation = useDeleteUser();

  return useMemo(
    () => [
      {
        name: "",
        selector: "is_verified",
        sortable: false,
        center: true,
        cell: (row) => (
          <>
            {row.is_verified ? (
              <GoVerified style={{ color: "#0894D7" }} size={20} />
            ) : (
              "-"
            )}
          </>
        ),
        width: "50px",
      },
      {
        name: t("name"),
        selector: "full_name",
        sortable: true,
        center: true,
        cell: (row) => <>{row?.full_name}</>,
      },
    
      {
        name: t("phone"),
        selector: "phone",
        sortable: true,
        center: true,
        cell: (row) => <div dir="ltr">{row.phone}</div>,
      },
      {
        name: "#",
        sortable: false,
        center: true,
        cell: (row) => (
          <Actions
            onEdit={() => {
              setEditModal(true);
              setObjectToEdit(row);
            }}
            onDelete={() => deleteMutation.mutate({ id: row.id })}
          >
            <RiLockPasswordFill
              onClick={() => {
                setEditPasswordModal(true);
                setObjectToEdit(row);
              }}
              className="cursor-pointer ml-1"
              size={22}
            />
          </Actions>
        ),
      },
    ],
    [t, deleteMutation, setEditModal, setEditPasswordModal, setObjectToEdit]
  );
};

export default useTableColumns;
