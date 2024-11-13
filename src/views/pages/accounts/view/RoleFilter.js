import React from "react";
import { FormGroup, Input } from "reactstrap";
import { Roles } from "configs/Roles";
import { useTranslation } from "utility/language";

const RoleFilter = ({ role, setRole }) => {
  const t = useTranslation();

  return (
    <FormGroup className="mb-0 mr-1">
      <Input
        type="select"
        name="role"
        id="role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="all">{t("all")}</option>
        {Roles.map((role) => (
          <option key={role} value={role}>
            {t(role)}
          </option>
        ))}
      </Input>
    </FormGroup>
  );
};

export default RoleFilter;
