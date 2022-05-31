import React, { useEffect, useState } from "react";
import cx from "classnames";
import { Switch, Route, Redirect } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { CircularProgress, Backdrop } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { AdminNavbar } from "@cenera/components/NavBars/AdminNavbar";
import { Footer } from "@cenera/components/Footer/Footer.js";
import Sidebar from "@cenera/components/Sidebar/Sidebar.js";
import { useAppContext } from "@cenera/app-context"; // new for showing selected team name
import { useGetTypes } from "@cenera/common/hooks/api-hooks/get-types";
import { useFetchClub } from "@cenera/common/hooks";
import { adminRoutes } from "./routes";
import { UserService } from "@cenera/services/api/user";

import styles from "./adminStyle";

const useStyles = makeStyles(styles as any);
let ps: any;

const AdminPage = (props: any) => {
  const { ...rest } = props;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [miniActive, setMiniActive] = useState(false);
  const [appState] = useAppContext();
  const [currentRoute, setCurrentRoute] = useState(adminRoutes);
  const [loadingRoute, setLoadingRoute] = useState(true);

  let routes = adminRoutes;

  const { club, loading: clubLoading } = useFetchClub(appState.user.club_id);

  // Get app types (Sports Types, team types, user types)
  useGetTypes();

  const classes = useStyles();
  const mainPanelClasses =
    classes.mainPanel +
    " " +
    cx({
      [classes.mainPanelSidebarMini]: miniActive,
      [classes.mainPanelWithPerfectScrollbar]:
        navigator.platform.indexOf("Win") > -1,
    });
  // ref for main panel div
  const mainPanel = React.createRef<HTMLDivElement>();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const sidebarMinimize = () => {
    setMiniActive(!miniActive);
  };

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  useEffect(() => {
    if (appState.authentication.accessToken) {
      UserService.getClubeuser(
        appState.authentication.accessToken,
        appState.user.user_id
      ).then((res) => {
        if (res.data.allowBooking === false) {
          currentRoute.splice(
            adminRoutes.findIndex((a) => a.name === "Activity"),
            1
          );
          setCurrentRoute(currentRoute);
        }
        if (res.data.allowGameinfo === false) {
          currentRoute.splice(
            adminRoutes.findIndex((a) => a.name === "Games"),
            1
          );
          setCurrentRoute(currentRoute);
        }
        setLoadingRoute(false);
      });
    }
  }, []);

  // effect instead of componentDidMount, componentDidUpdate and componentWillUnmount
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);

    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  });

  const getRoutes = (routes: any) => {
    return routes.map((prop: any, key: any) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    });
  };

  // Returns the active route name property
  const getActiveRoute = (routes: any): string => {
    const activeRoute = "Cenera Sports Web";
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < routes.length; i += 1) {
      if (routes[i].collapse) {
        const collapseActiveRoute = getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };

  if (appState.user.user_type === "teamAdmin") {
    routes = adminRoutes.filter((r) => r.state !== "userManagementCollapse");
  }

  return (
    <>
      <div className={classes.wrapper}>
        <Sidebar
          routes={loadingRoute === false ? currentRoute : []}
          logoText={"Cenera Sports"}
          logo={require("@cenera/assets/images/logo.png")}
          image={require("@cenera/assets/images/sidebar-2.jpg")}
          handleDrawerToggle={handleDrawerToggle}
          open={mobileOpen}
          color={`blue`}
          bgColor={`black`}
          miniActive={miniActive}
          userName={appState.user.user_login}
          clubName={!clubLoading && club ? club.club_name : "..."}
          teamName={appState.teamName && appState.teamName}
          {...rest}
        />

        <div className={mainPanelClasses} ref={mainPanel}>
          <AdminNavbar
            sidebarMinimize={sidebarMinimize}
            miniActive={miniActive}
            brandText={getActiveRoute(routes)}
            handleDrawerToggle={handleDrawerToggle}
            {...rest}
          />
          <div className={classes.content}>
            <div className={classes.container}>
              <Switch>
                {getRoutes(currentRoute)}
                <Redirect from="/admin" to="/admin/dashboard" />
              </Switch>
            </div>
          </div>
          <Footer fluid={true} />
        </div>
      </div>

      <Backdrop className={classes.backdrop} open={loadingRoute}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default AdminPage;
