import { useSelector, useDispatch } from "react-redux";
import * as actions from "redux/actions/auth/loginActions";
import { VIEWER } from "configs/Roles";

export const useAuth = () => {
  const { user, token, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const login = (values) => {
    dispatch(actions.login(values));
  };

  const updateUserInfo = (newValues) => {

    dispatch(actions.updateUserInfo(newValues))
  }

  const logout = () => {
    dispatch(actions.logout());
  };

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUserInfo
  };
};

export const useIsAuthorized = () => {
  const { user } = useAuth();
  return user?.role_type !== VIEWER;
};
