import { useGetAllPermission } from "api/accounts";
import { useGetcustomerWithOutPaginition } from "api/customer";
import { useGetDriver, useGetDriverForSelect } from "api/driver";
import { Field, useFormikContext } from "formik";
import React from "react";
import Select, { components } from "react-select";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { Convert_data_to_select } from "../notification/formutils";
import './styles.css'
function arrayMove(array, from, to) {
  array = array.slice();
  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
  return array;
}
const SortableMultiValue = SortableElement(props => {
  const onMouseDown = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  const innerProps = { onMouseDown };
  return <components.MultiValue {...props} innerProps={innerProps} />;
});
const SortableSelect = SortableContainer(Select);
export default function MultiSelectSort() {
  const formik =  useFormikContext()
  const  {data:customer}= useGetAllPermission()
  const [selected, setSelected] = React.useState([]);
const onChange = selectedOptions => {
  setSelected((selectedOptions))
  formik.setFieldValue('permissions' ,selectedOptions)
};
const onSortEnd = ({ oldIndex, newIndex }) => {
    const newValue = arrayMove(selected, oldIndex, newIndex);
    setSelected(newValue);
   
  };
  
return (
   <>

    <SortableSelect
    className="none"
    axis="xy"
    onSortEnd={onSortEnd}
    distance={3}
    getHelperDimensions={({ node }) => node.getBoundingClientRect()}
    isMulti
    options={Convert_data_to_select(customer||[])}
    value={selected}
    onChange={onChange}
    
    components={{
      MultiValue: SortableMultiValue
    }}
    closeMenuOnSelect={false}
  />
  <Field
  name="permissions" 
  style={{visibility: "hidden"}}
  />
   </>
  );
}