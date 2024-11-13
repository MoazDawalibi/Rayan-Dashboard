import React, { Suspense, lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "./history";
import { connect } from "react-redux";
import Spinner from "./components/@vuexy/spinner/Loading-spinner";
import { ContextLayout } from "./utility/context/Layout";
import { AuthComponent } from "AuthComponent";
import PageLayout from "DashBoardLayout/PageLayout";



const AddRolePage = lazy(()=>import('views/pages/Role/AddRolePage'))
const EditAccount = lazy(() =>import("views/pages/accounts/edit/EditAccount"));
const AddAccount = lazy(() =>import("views/pages/accounts/add/AddAdmin"));
const RolePage = lazy(() =>import("views/pages/Role/RolePage"));
const ViewAccounts = lazy(() =>import("./views/pages/accounts/view/ViewPannel"));
const SingleOrderPage = lazy(()=>import('views/pages/order/view_one/SingleOrderPage'))
const NotPage  = lazy(()=>import('views/pages/notification/NotPage'))
const AddNotPage  = lazy(()=>import('views/pages/notification/AddNotPage'))
const UnAcceptableOrder= lazy(()=> import("views/pages/unacceptable_order/UnAcceptableOrder"))
const DriverRate = lazy(()=> import("views/pages/driver_rate/DriverRate"))
const AddCustomerPage = lazy(()=> import("views/pages/customer/AddCustomerPage"))
const AddDriverPage = lazy(()=> import("./views/pages/driver/AddDriverPage"))
const AppSettingPage = lazy(() => import("views/pages/app_settings/AppSettingPage"))
const HomePage = lazy(() => import("./views/pages/home/HomePage"));
const CategoriesPage = lazy(() => import("./views/pages/categories/CategoriesPage"));
const OrderPage = lazy(() => import("./views/pages/order/OrderPage"));
const CustomerPage = lazy(() =>import("./views/pages/customer/CustomerPage"));
const DriverPage = lazy(() =>import("./views/pages/driver/DriverPage"));
const TransactionPage = lazy(() =>import("./views/pages/transaction/TransactionPage"));
const WalletsPage = lazy(()=> import("views/pages/gifts/GiftPage"))
const CodePage = lazy(()=> import("views/pages/code/CodePage"))
const MyAccountPage = lazy(() => import("views/pages/my_account/MyAccount"));
const SocialMedia = lazy(() =>import("./views/pages/socialMedia/SocialMediaPage"));
const UsersPage = lazy(() => import("./views/pages/users/UsersPage"));
const PrivacyPage = lazy(() =>import("./views/pages/information/privacy/PrivacyPage"));
const AboutUsPage = lazy(() =>import("./views/pages/information/about_us/AboutUsPage"));
const login = lazy(() => import("./views/pages/authentication/login/Login"));
const error404 = lazy(() => import("./views/pages/misc/error/404"));
const authorized = lazy(() => import("./views/pages/misc/NotAuthorized"));

// Set Layout and Component Using App Route
const RouteConfig = ({
  component: Component,
  fullLayout,
  permission,
  auth,
  isPrivate,
  ...rest
}) => {
  const ToRender = () => (
    <Route
      {...rest}
      render={(props) => {
        return (
          <ContextLayout.Consumer>
            {(context) => {
              let LayoutTag =
                fullLayout === true
                  ? context.fullLayout
                  : context.state.activeLayout === "horizontal"
                  ? context.horizontalLayout
                  : context.VerticalLayout;
               
              return (
                <LayoutTag {...props} permission={auth.user.role}>
                  <Suspense fallback={<Spinner />}>
                    <PageLayout>
                        <Component {...props} />
                    </PageLayout>
                  </Suspense>
                </LayoutTag>
              );
            }}
          </ContextLayout.Consumer>
        );
      }}
    />
  );

  if (isPrivate) {
    return (
      <AuthComponent>
        <ToRender />
      </AuthComponent>
    );
  }
  return <ToRender />;
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const AppRoute = connect(mapStateToProps)(RouteConfig);

class AppRouter extends React.Component {
  render() {
    return (
      // Set the directory path if you are deploying in sub-folder
      <Router history={history}>
        <Switch>
          <AppRoute exact path="/" component={HomePage} isPrivate />
          <AppRoute
            exact
            path="/myAccount"
            component={MyAccountPage}
            isPrivate
          />
          <AppRoute
            exact
            path="/wallets"
            component={WalletsPage}
            isPrivate
          />
          <AppRoute
            exact
            path="/code"
            component={CodePage}
            isPrivate
          />
          <AppRoute
            exact
            path="/driver"
            component={DriverPage}
            isPrivate
          />
          <AppRoute
            exact
            path="/customer"
            component={CustomerPage}
            isPrivate
          />
          <AppRoute
            exact
            path="/driver/:id"
            component={AddDriverPage}
            isPrivate
          />
            <AppRoute
            exact
            path="/unacceptable_order"
            component={UnAcceptableOrder}
            isPrivate
          />
           <AppRoute
            exact
            path="/customer/:id"
            component={AddCustomerPage}
            isPrivate
          />
          <AppRoute
            exact
            path="/transaction"
            component={TransactionPage}
            isPrivate
          />
             <AppRoute
            exact
            path="/orders"
            component={OrderPage}
            isPrivate
          />
              <AppRoute
            exact
            path="/order/:id"
            component={SingleOrderPage}
            isPrivate
          />
          <AppRoute
            exact
            path="/categories"
            component={CategoriesPage}
            isPrivate
          />
           <AppRoute
            exact
            path="/driver_rate"
            component={DriverRate}
            isPrivate
          />
          <AppRoute
            exact
            path="/notification"
            component={NotPage}
            isPrivate
          />
             <AppRoute
            exact
            path="/notification/add"
            component={AddNotPage}
            isPrivate
          />
           <AppRoute
            exact
            path="/app_setting"
            component={AppSettingPage}
            isPrivate
          />
          <AppRoute
            exact
            path="/social_media"
            component={SocialMedia}
            isPrivate
          />
              <AppRoute
            exact
            path="/information/privacy"
            component={PrivacyPage}
            isPrivate
          />
          <AppRoute
            exact
            path="/information/about-us"
            component={AboutUsPage}
            isPrivate
          />
            <AppRoute
            exact
            path="/accounts/role"
            component={RolePage}
            isPrivate
          />
         <AppRoute
            exact
            path="/accounts/role/add"
            component={AddRolePage}
            isPrivate
          />
          <AppRoute exact path="/users" component={UsersPage} isPrivate />
          <AppRoute
            exact
            path="/accounts/view"
            component={ViewAccounts}
            isPrivate
          />
          <AppRoute
            exact
            path="/accounts/edit"
            component={EditAccount}
            isPrivate
          />
          <AppRoute exact path="/user s" component={UsersPage} isPrivate />

          <AppRoute
            exact
            path="/accounts/add"
            component={AddAccount}
            isPrivate
          />
         
          <AppRoute path="/login" component={login} fullLayout />
          <AppRoute
            path="/misc/not-authorized"
            component={authorized}
            fullLayout
          />
          <AppRoute component={error404} fullLayout />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;

