import React from "react";
import { RegisterForm } from "./RegisterForm";
import { Card, CardHeader, CardBody } from "reactstrap";
import { useTranslation } from "utility/language";
import { useAddAccount } from "api/accounts";
import { history } from "../../../../history";

const AddAccount = () => {
  const t = useTranslation();
  const addMutation = useAddAccount();

  React.useEffect(() => {
    if (addMutation.isSuccess) {
      history.push("/accounts/view");
    }
  }, [addMutation.isSuccess]);

  return (
    <Card>
      <CardHeader>
        <h4>{t("add_account")}</h4>
      </CardHeader>
      <CardBody>
        <RegisterForm mutation={addMutation} />
      </CardBody>
    </Card>
  );
};

export default AddAccount;
