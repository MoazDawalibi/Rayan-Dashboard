import React from "react";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import * as Icon from "react-feather";
import LanguageDropdown from "./LanguageDropdown";
import { useAuth } from "redux/hooks/auth";
import { useTranslation } from "utility/language";

import { history } from "../../../history";

const UserDropdown = (props) => {
  const { logout } = useAuth();
  const t = useTranslation();

  return (
    <DropdownMenu right>
      <DropdownItem
        tag="a"
        href="/myAccount"
        onClick={(e) => {
          e.preventDefault();
          history.push("/myAccount");
        }}
      >
        <Icon.User size={14} className="mr-50" />
        <span className="align-middle">{t("my_account")}</span>
      </DropdownItem>
      <DropdownItem
        tag="a"
        href="/login"
        onClick={(e) => {
          e.preventDefault();
          logout();
        }}
      >
        <Icon.Power size={14} className="mr-50" />
        <span className="align-middle">{t("logout")}</span>
      </DropdownItem>
    </DropdownMenu>
  );
};

const RoleRenderer = (props) => {
  const { user } = useAuth();
  const t = useTranslation();

  return t(user?.role_type);
};

class NavbarUser extends React.PureComponent {
  render() {
    return (
      <ul className="nav navbar-nav navbar-nav-user float-right">
        <LanguageDropdown tag="li" />

        <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
          <DropdownToggle tag="a" className="nav-link dropdown-user-link">
            <div className="user-nav d-sm-flex d-none">
              <span className="user-name text-bold-600">
                {this.props.userName}
              </span>
              <span className="user-status">
                <RoleRenderer />
              </span>
            </div>
            <span data-tour="user">
              <img
                src={this.props.userImg}
                className="round"
                height="40"
                width="40"
                alt="avatar"
              />
            </span>
          </DropdownToggle>
          <UserDropdown {...this.props} />
        </UncontrolledDropdown>
      </ul>
    );
  }
}
export default NavbarUser;
