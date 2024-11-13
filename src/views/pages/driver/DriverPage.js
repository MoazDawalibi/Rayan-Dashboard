import React, { useCallback } from "react";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";
import "assets/scss/plugins/extensions/react-paginate.scss";
import { Button, Card, CardBody, Input } from "reactstrap";
import PerPageDropdown from "components/PerPageDropdown";
import { useTranslation } from "utility/language";
import { SearchInput } from "components/input/SearchInput";
import { useGetUsers } from "api/users";
import useTableColumns from "./useTableColumns";
import { usePagination } from "hooks/dataTable/usePagination";
import { usePaginationWithURL } from "hooks/usePaginationWithURL";
import { TableSpinner } from "views/components/TableSpinner";
import BlockDriverModel from "./BlockDriverModel";
import { useState } from "react";
import GiftDriverModel from "./GiftDriverModel";
import { useDeleteDriver, useGetDriver } from "api/driver";
import UnBlockCustomerModel from "../customer/UnBlockCustomerModel";
import UnBlockDriverModel from "./UnBlockDriverModel";

import Actions from "components/table/TableActions";
import { history } from "../../../history";

import { GrView } from "react-icons/gr";
import { MdOutlineBlock } from "react-icons/md";
import { AiOutlineGift } from "react-icons/ai";
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';


const DriverPage = (props) => {
  
  const t = useTranslation();

  //pagination
const [openGiftModal , setopenGiftModal] = useState(false)
  const [objectIDForGift, setobjectIDForGift] = React.useState(null)
  const { page, per_page, handlePageChange, handlePerPageChange } =
    usePaginationWithURL(props.location);
  const filterPagination = usePagination();

  //Data Manipulation -- Edit
  //filters
  const [search, setSearchText] = React.useState("");
  const [openunBlockModal , setopenunBlockModal] = React.useState(false)
 const [openBlockModal , setopenBlockModal] = React.useState(false)
 const [objectIDForBlock , setobjectIDForBlock ] = React.useState(false)
  
  const filterIsApplied = search !== "";
  React.useEffect(() => {
    if (filterIsApplied) {
      filterPagination.handlePageChange(0);
    }
    //eslint-disable-next-line
  }, [search, filterIsApplied ]);

  //data
  const { data, isLoading } = useGetDriver({
    page: filterIsApplied ? filterPagination.page : page,
    per_page,
    search,
  
  });
  const users = data?.data || [];
  const totalRows = data?.pagination?.total || 0;
  const columns = useTableColumns(setopenBlockModal ,setobjectIDForBlock , setopenGiftModal ,setobjectIDForGift ,setopenunBlockModal);
 
  const conditionalRowStyles = 
  [
    {
      when: row => row.status ==='blocked',
      style: {
        
       
        opacity:0.4,
        
        color: 'black',
        '&:hover': {
          cursor: 'pointer',
        
        }
      },
    },
  ]
  const deleteMutation = useDeleteDriver();

  const ExpandedComponent = ({ data }) => {
    const row = data
    
    return (
      <span style={{display:"flex" , alignItems:"center" , justifyContent:"space-between" , width:"300px" , height:"50px" , marginInline:"60px"}}>
        {t("Actions")}
      <GrView
       onClick={()=>history.push(`/driver/${row.id}`)}
       size={22}
       style={{ cursor: "pointer" }}
     />
     <Actions
   
     showEdit={false}
     showDelete
     onDelete={() => deleteMutation.mutate({ id: row.id })}
   />
   
    <MdOutlineBlock className="cursor-pointer " size={20}  style={{display:row.status!=='blocked' ? "inline" : 'none', marginInline:5}} onClick={(() =>{
     setopenBlockModal(v => !v)
     setobjectIDForBlock(row.id)
   
   })
   
   }/>
   <AiOutlineGift  size={25} className="cursor-pointer " style={{display:row.status!=='blocked' ? "inline" : 'none', marginInline:5}} onClick={(() =>{
     setopenGiftModal(v => !v)
     setobjectIDForGift(row.id)
   
   })}
   />  
     <LockOpenOutlinedIcon  className="cursor-pointer "  onClick={(() =>{
      setopenunBlockModal(v => !v)
      setobjectIDForBlock(row.id)
    
   
   })}
     style={{display:row.status ==='blocked' ? "inline" : 'none'}}/>  
    </span>
    )
  };
  return (
    <>
      <div className="d-flex align-items-center mb-1 justify-content-between flex-wrap" style={{width:'100%'}}>
      <div className="d-flex align-items-center"><h4 className="">{t("drivers")}</h4></div>
        <div className="d-flex align-items-end flex-column">
        {/* <div className="d-flex ">
        <Button color="success " className="" style={{margin:"5px" ,fontSize:"16px" , width:"200px" }}>{t('send_notification')}</Button>
          <Input type="text"  placeholder={t("enter_notification")} style={{margin:"5px" ,width:"200px"}}  color="success"/>
        </div> */}
        <div className="d-flex ">
        <PerPageDropdown
            className="custom-dropdown mr-1"
            per_page={per_page}
            handlePerPage={(v) => {
              filterPagination.handlePageChange(0)
              handlePerPageChange(v);
              filterPagination.handlePerPageChange(v);
             
            }}
          />
          
          <SearchInput onChange={setSearchText}  placeholder={t("_search.driver")}/>
        </div>
        </div>
      </div>
      <Card>
        
        <CardBody className="">
          <DataTable
            columns={columns}
            data={users}
            expandableRows
            expandableRowsComponent={<ExpandedComponent/>}
            progressPending={isLoading}
            progressComponent={<TableSpinner />}
            noDataComponent={<h6 className="my-4">{t("no_records")}</h6>}
            noHeader
            pagination
            conditionalRowStyles={conditionalRowStyles}
            
            paginationServer
            paginationComponent={() => (
              <ReactPaginate
                previousLabel={<ChevronLeft size={15} />}
                nextLabel={<ChevronRight size={15} />}
                breakLabel="..."
                breakClassName="break-me"
                pageCount={totalRows / per_page}
                containerClassName="vx-pagination separated-pagination pagination-center pagination-sm mb-0 mt-2"
                activeClassName="active"
                forcePage={
                  filterIsApplied ? filterPagination.page - 1 : page - 1
                }
                onPageChange={(v) => {
                  if (filterIsApplied) {
                    filterPagination.handlePageChange(v);
                  } else {
                    handlePageChange(v);
                  }
                }}
              />
            )}
            
            sortServer
          />
        </CardBody>
      </Card>
      <BlockDriverModel isOpen={openBlockModal} setIsopen={setopenBlockModal} objectID={objectIDForBlock} />
      <UnBlockDriverModel isOpen={openunBlockModal} setIsopen={setopenunBlockModal} objectID={objectIDForBlock} />
      <GiftDriverModel isOpen={openGiftModal} setIsopen={setopenGiftModal} objectID={objectIDForGift} />

    </>
  );
};

export default DriverPage;
