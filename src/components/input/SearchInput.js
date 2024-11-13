import React, { useState } from "react";
import { Input } from "reactstrap";
import { Search } from "react-feather";
import { useDebounce } from "hooks";

export const SearchInput = ({ onChange, placeholder }) => {
  const [value, setValue] = useState("");
  useDebounce(() => onChange(value), 700, [value]);

  return (
    <div className="search-filter">
      <Search className="search-icon" size={16} />
      <Input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};
