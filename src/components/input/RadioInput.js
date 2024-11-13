import React from "react";
import { useFormikContext } from "formik";
import Radio from "components/@vuexy/radio/RadioVuexy";

export const RadioInput = ({ name, options, ...props }) => {
  const formik = useFormikContext();

  return (
    <>
      {options.map(({ label, value }) => (
        <Radio
          key={value}
          label={label}
          name={name}
          defaultChecked={formik.values[name] === value}
          value={formik.values[name]}
          onClick={() => formik.setFieldValue(name, value)}
          {...props}
        />
      ))}
    </>
  );
};
