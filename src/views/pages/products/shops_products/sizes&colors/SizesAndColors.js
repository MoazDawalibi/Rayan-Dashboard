import React from "react";
import useTableColumns from "./useTableColumns";
import { useTranslation } from "utility/language";
import DataTable from "react-data-table-component";
import "assets/scss/plugins/extensions/react-paginate.scss";
import { Card, CardBody } from "reactstrap";
import { AddButton } from "components/AddButton";
import AddSizeAndColorModal from "./AddSizeAndColorModal";
import EditSizeAndColorModal from "./EditSizeAndColorModal";
import { TableSpinner } from "views/components/TableSpinner";
import { useIsAuthorized } from "redux/hooks/auth";

const SizeAndColors = ({product}) => {
  const t = useTranslation();
  const isAuthorized = useIsAuthorized();

  //Data Manipulation -- Add + Edit
  const [addModal, setAddModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [objectToEdit, setObjectToEdit] = React.useState(null);

  //Table Content -- Data + Columns
  const sizesAndColors = product?.product_variations || [];
  const id=product?.id||null;
  const columns = useTableColumns(setEditModal, setObjectToEdit);





  return (
    <>
      <h4>{t("sizes&colors")}</h4>
      <div className="d-flex align-items-center mb-1 justify-content-between">
        <div className="d-flex">
          {isAuthorized && <AddButton onClick={() => setAddModal(true)} />}
        </div>
  
      </div>
      <Card>
        <CardBody className="p-1">
          <DataTable
            columns={columns}
            data={sizesAndColors}
            progressComponent={<TableSpinner />}
            noDataComponent={<h6 className="my-4">{t("no_records")}</h6>}
            noHeader
            pagination
          />
        </CardBody>
      </Card>
      <AddSizeAndColorModal isOpen={addModal} setIsOpen={setAddModal} product_id={id}/>
      <EditSizeAndColorModal
        product_id={id}
        isOpen={editModal}
        setIsOpen={setEditModal}
        objectToEdit={objectToEdit}
        setObjectToEdit={setObjectToEdit}
      />
    </>
  );
};

export default SizeAndColors;
