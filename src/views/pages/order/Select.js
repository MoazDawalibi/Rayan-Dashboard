import React, { useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import PropTypes from 'prop-types';
import {BsArrowDownShort} from 'react-icons/bs'
import { useTranslation } from 'utility/language';

function SelectType({ direction, title  , setSelectType,setRefreshPage}) {
  const t = useTranslation()
  const [dropdownOpen, setDropdownOpen] = useState(false);
    
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div className="d-flex " style={{marginInline:10 }}>
      <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction} size={30}    
       
>
        <DropdownToggle outline style={{color:"black" , width:"100%" , border:"gray solid 2px" , borderRadius:"10px" , padding:"8px"}} nav caret >{t(localStorage.getItem('order_status') || 'all')} <BsArrowDownShort size={17} style={{height:20}} /></DropdownToggle>
        <DropdownMenu >
        <DropdownItem onClick={()=>{
          setRefreshPage(v => !v)
          setSelectType('status')
          localStorage.setItem('order_status','')
          }} style={{width:"100%", }}>{t('all')}</DropdownItem>
          <DropdownItem onClick={()=>{
            setRefreshPage(v => !v)
            setSelectType('complete')
            localStorage.setItem('order_status','complete')
            }} style={{color:"black", width:"100%"}}>{t('complete')}</DropdownItem>
          <DropdownItem onClick={()=>{
            setRefreshPage(v => !v)
            setSelectType('canceled')
            localStorage.setItem('order_status','canceled')
            }} style={{color:"black", width:"100%"}}>{t('canceled')}</DropdownItem>

        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

SelectType.propTypes = {
  direction: PropTypes.string,
};

export default SelectType;
