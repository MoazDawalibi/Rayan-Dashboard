import React from "react";
import { useTranslation } from "utility/language";
import { TableSpinner } from "components/table/TableSpinner";

import DataTable from "react-data-table-component";
import "assets/scss/plugins/extensions/react-paginate.scss";

const DataTableComponent = (props) => {
  const t = useTranslation();

  return (
    <DataTable
      progressComponent={<TableSpinner />}
      noDataComponent={<h6 className="my-4">{t("no_records")}</h6>}
      {...props}
    />
  );
};

export default DataTableComponent;
