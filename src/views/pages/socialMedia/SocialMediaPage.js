import React from "react";
import DataTable from "components/table/DataTable";
import "assets/scss/plugins/extensions/react-paginate.scss";
import { Card, CardBody, CardHeader } from "reactstrap";
import { useTranslation } from "utility/language";
import useTableColumns from "./useTableColumns";
import { AddButton } from "components/AddButton";
import AddSocialMediaModal from "./AddSocialMediaModal";
import EditSocialMediaModal from "./EditSocialMediaModal";
import { useGetSocialMedia } from "api/socialMedia";
import AuthComponent from "components/AuthComponent";

const SocialMediaPage = () => {
  const t = useTranslation();
  //Data Manipulation -- Edit --Add
  const [editModal, setEditModal] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [objectToEdit, setObjectToEdit] = React.useState(null);
  //data
  const { data, isLoading } = useGetSocialMedia();
  const social_media = data?.social_media || [];

  const columns = useTableColumns({
    setEditModal,
    setObjectToEdit,
  });
  return (
    <>
      <Card>
        <CardHeader>
          <h1 className="pt-2 mb-1">{t("social_media")}</h1>
          <AuthComponent>
            <AddButton onClick={() => setIsOpen(true)} />
          </AuthComponent>
        </CardHeader>
        <CardBody className="p-1">
          <DataTable
            columns={columns}
            data={social_media}
            progressPending={isLoading}
            noHeader
            pagination
          />
        </CardBody>
      </Card>
      <AddSocialMediaModal isOpen={isOpen} setIsOpen={setIsOpen} />
      {editModal && (
        <EditSocialMediaModal
          isOpen={editModal}
          setIsOpen={setEditModal}
          objectToEdit={objectToEdit}
          setObjectToEdit={setObjectToEdit}
        />
      )}
    </>
  );
};

export default SocialMediaPage;
