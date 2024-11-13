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

function SelectType({ direction, title  , setSelectType ,key1 ,setRefreshPage}) {
  const t = useTranslation()
  const [dropdownOpen, setDropdownOpen] = useState(false);
    
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div className="d-flex " style={{marginInline:10 }}>
      <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction} size={30} >
        <DropdownToggle outline style={{color:"black" , width:"100%"}} nav caret >{t(title)} <BsArrowDownShort size={17} style={{height:20}} /></DropdownToggle>
        <DropdownMenu >
        <DropdownItem onClick={()=>
          {setSelectType(key1)
           setRefreshPage(v=>!v)
            localStorage.setItem('transaction'+key1,'')
          }
          } style={{color:"white", width:"100%", }}>EKUF</DropdownItem>
        <DropdownItem onClick={()=>
          {setSelectType('admin')
         setRefreshPage(v=>!v)
          localStorage.setItem('transaction'+key1,'admin')
          }} style={{color:"black", width:"100%"}}>{t('admin')}</DropdownItem>
          <DropdownItem onClick={()=>
            {setSelectType('driver')
           setRefreshPage(v=>!v)
            localStorage.setItem('transaction'+key1,'driver')
            }} style={{color:"black" , width:"100%"}}>{t('driver')}</DropdownItem>
          <DropdownItem onClick={()=>
            {setSelectType('customer')
           setRefreshPage(v=>!v)
            localStorage.setItem('transaction'+key1,'customer')
            }} style={{color:"black", width:"100%"}}>{t('customer')}</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

SelectType.propTypes = {
  direction: PropTypes.string,
};

export default SelectType;
