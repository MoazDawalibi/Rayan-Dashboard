import React, { useMemo } from "react";
import { useTranslation } from "utility/language";
import { baseURL } from "api/config";
import Actions from "components/table/TableActions";
import HovarableImage from "components/HovarableImage";
import { ToggleStatus } from "components/ToggleStatus";
import {
  useDeleteSocialMedia,
  useUpdateSocialMediaStatus,
} from "api/socialMedia";

const useTableColumns = ({ setEditModal, setObjectToEdit }) => {
  const t = useTranslation();
  const deleteMutation = useDeleteSocialMedia();
  const toggleMutation = useUpdateSocialMediaStatus();
  return useMemo(
    () => [
      {
        name: t("link"),
        selector: "social_media_link",
        sortable: false,
        center: true,
        cell: (row) => (
          <a
            href={row.social_media_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {row.social_media_link}
          </a>
        ),
      },

      {
        name: t("image"),
        sortable: false,
        center: true,
        selector: "social_media_image",
        cell: (row) => (
          <HovarableImage
            id={`social_media_image_${row.id}`}
            src={`${baseURL}${row.social_media_image}`}
            width="35"
          />
        ),
      },
      {
        name: t("status"),
        sortable: false,
        center: true,
        cell: (row) => (
          <ToggleStatus object={row} toggleMutation={toggleMutation} />
        ),
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
          />
        ),
      },
    ],
    [t, deleteMutation, setEditModal, setObjectToEdit, toggleMutation]
  );
};

export default useTableColumns;
