import React from "react";
import useTableColumns from "./useTableColumns";
import { useTranslation } from "utility/language";
import DataTable from "react-data-table-component";
import "assets/scss/plugins/extensions/react-paginate.scss";


import { AddButton } from "components/AddButton";
import AddSizeModal from "./AddSizeModal";
import { useIsAuthorized } from "redux/hooks/auth";

const Sizes = ({sizes}) => {
  const t = useTranslation();
  const isAuthorized = useIsAuthorized();

  //Data Manipulation -- Add + Edit
  const [addModal, setAddModal] = React.useState(false);



  const columns = useTableColumns();


  return (
    <>
      <div className="d-flex align-items-center m-1 justify-content-between">
      <h3>{t("sizes")}</h3>
        <div className="d-flex">
          {isAuthorized && <AddButton onClick={() => setAddModal(true)} />}
        </div>

      </div>

          <DataTable
            columns={columns}
            data={ sizes}
            noDataComponent={<h6 className="my-4">{t("no_records")}</h6>}
            noHeader
          />
   
      <AddSizeModal isOpen={addModal} setIsOpen={setAddModal} />

    </>
  );
};

export default Sizes;
