import React, { useEffect } from "react";
import Loadable from "@loadable/component";
import { Switch, Route, Redirect, RouteProps, useLocation } from "react-router-dom";
import { useAppContext } from "@cenera/app-context";

const Activities = Loadable(() => import("@cenera/pages/Activities"));
const ActivitiesDetail = Loadable(() => import("@cenera/pages/ActivitiesDetail"));
const Login = Loadable(() => import("@cenera/pages/Login"));

const Admin = Loadable(() => import("@cenera/pages/Admin"));

const PasswordReset = Loadable(() => import("@cenera/pages/PasswordReset"));

export const AppRoutes = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scroll({ top: 0, left: 0 });
  }, [pathname]);

  return (
    <Switch>
      <Route path="/" exact={true} component={Activities} />
      <Route path="/activitiesdetail" exact={true} component={ActivitiesDetail} />
      <Route path="/login" exact={true} component={Login} />
      <Route path="/resetpassword" exact={true} component={PasswordReset} />
      <PrivateRoute path="/admin" component={Admin} />
      <Redirect from="/" to="/admin" />
      {/* <Route path="*">
        <NotFoundErrorPage />
      </Route> */}
    </Switch>
  );
};

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ component: Component, ...rest }: RouteProps) {
  const [appState] = useAppContext();
  return (
    <Route
      {...rest}
      render={(props) =>
        appState.authentication.accessToken !== null ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}
