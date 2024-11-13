import { useState } from "react";

export const usePagination = () => {
  const st_page = localStorage.getItem("page");
  const [page, setPage] = useState(st_page ? st_page : 1);
  const [per_page, setPerPage] = useState(10);
  const handlePageChange = (val) => setPage(val.selected + 1);
  const handlePerPageChange = (val) => {
    setPerPage(val);
    setPage(1);
  };

  return {
    page,
    per_page,
    handlePageChange,
    handlePerPageChange,
  };
};
