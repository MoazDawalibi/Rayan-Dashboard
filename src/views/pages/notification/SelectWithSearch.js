import { useGetcustomerWithOutPaginition } from "api/customer";
import { useGetDriver, useGetDriverForSelect } from "api/driver";
import { Field, useFormikContext } from "formik";
import React from "react";
import Select, { components } from "react-select";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { Convert_data_to_select, get_id_from_array } from "./formutils";

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
  const  {data}= useGetDriverForSelect()
  const  {data:customer}= useGetcustomerWithOutPaginition()
  const [selected, setSelected] = React.useState([]);
const onChange = selectedOptions => {
  setSelected((selectedOptions))
  formik.setFieldValue('select' ,selectedOptions)
};
const onSortEnd = ({ oldIndex, newIndex }) => {
    const newValue = arrayMove(selected, oldIndex, newIndex);
    setSelected(newValue);
   
  };
  
return (
   <>

    <SortableSelect
    
    axis="xy"
    onSortEnd={onSortEnd}
    distance={4}
    getHelperDimensions={({ node }) => node.getBoundingClientRect()}
    isMulti
    options={formik.getFieldProps('type').value ==='driver'? Convert_data_to_select(data||[]) :Convert_data_to_select(customer||[])}
    value={selected}
    onChange={onChange}
    components={{
      MultiValue: SortableMultiValue
    }}
    closeMenuOnSelect={false}
  />
  <Field
  name="select" 
  style={{visibility: "hidden"}}
  />
   </>
  );
}