import React from "react";
import { RegisterForm } from "../add/RegisterForm";
import { Card, CardHeader, CardBody } from "reactstrap";
import { useTranslation } from "utility/language";
import { useUpdateAccount } from "api/accounts";
import { history } from "../../../../history";

const EditAccount = (props) => {
  const t = useTranslation();
  const objectToEdit = props.location.state;
  const updateMutation = useUpdateAccount();

  React.useEffect(() => {
    if (updateMutation.isSuccess) {
      history.push("/accounts/view");
    }
  }, [updateMutation.isSuccess]);

  return (
    <Card>
      <CardHeader>
        <h4>{t("edit_account")}</h4>
      </CardHeader>
      <CardBody>
        <RegisterForm
          mutation={updateMutation}
          editMode={true}
          objectToEdit={objectToEdit}
        />
      </CardBody>
    </Card>
  );
};

export default EditAccount;
