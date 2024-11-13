import React from "react";
import { Modal, ModalHeader } from "reactstrap";
import { useTranslation } from "utility/language";

import DataTable from "react-data-table-component";
import useTableColumnsDriver from "./useTableColumnDriver";


const OrderSelectDriverModal = ({ isOpen, setIsOpen  }) => {
  const t = useTranslation();
  const columns = useTableColumnsDriver()
const data = [{id:"1"}]


  return (
    <Modal centered isOpen={isOpen} size="lg">
      <ModalHeader toggle={() => setIsOpen((v) => !v)}>
        {t("select_driver")}
      </ModalHeader>
        <DataTable
        columns={columns}
        data={data}
        pagination
        noHeader
        />
    </Modal>
  );
};

export default OrderSelectDriverModal;
