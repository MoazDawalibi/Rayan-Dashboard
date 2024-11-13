import { Roles, SUPER_ADMIN, ADMIN } from "configs/Roles";

import PropTypes from "prop-types";
import { useAuth } from "redux/hooks/auth";

const AuthComponent = ({
  allowedRoles = [SUPER_ADMIN, ADMIN],
  notAuthRender: NotAuthRender = null,
  children,
  action
}) => {
 
  const { user } = useAuth();

  const isAuthorized = true;

  if (!isAuthorized) {
    return NotAuthRender === null ? null : <NotAuthRender />;
  }
  return children;
};

AuthComponent.propTypes = {
  allowedRoles: PropTypes.arrayOf(Roles),
};

export default AuthComponent;
