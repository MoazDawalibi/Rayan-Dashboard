import React from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { ChevronDown } from "react-feather";
import PropTypes from "prop-types";

const yearArr = [];
for (let i = 2022; i <= new Date().getFullYear(); i++) yearArr.push(i);

const YearDropdown = ({ year, handlechange, ...props }) => {
  return (
    <UncontrolledDropdown {...props}>
      <DropdownToggle style={{ cursor: "pointer" }} tag="div">
        {year}
        <ChevronDown className="ml-50" size={15} />
      </DropdownToggle>
      <DropdownMenu>
        {yearArr.map((num) => (
          <DropdownItem key={num} tag="div" onClick={() => handlechange(num)}>
            {num}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default YearDropdown;
YearDropdown.propTypes = {
  year: PropTypes.number.isRequired,
  handlechange: PropTypes.func.isRequired,
};
