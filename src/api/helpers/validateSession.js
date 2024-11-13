import { store } from "redux/storeConfig/store";
import { logout } from "redux/actions/auth/loginActions";

export const validateSession = ({ status }) => {
  if (status === 401 || status === 403) {
    // toast.error("Session Expired, Please Login");
    store.dispatch(logout());
  }
};
