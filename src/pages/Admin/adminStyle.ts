import {
  drawerWidth,
  drawerMiniWidth,
  transition,
  containerFluid,
} from "@cenera/common/styles/common-styles";

const appStyle = (theme: any) => ({
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh",
    // overflowY: "auto",
    "&:after": {
      display: "table",
      clear: "both",
      content: '" "',
    },
  },
  mainPanel: {
    transitionProperty: "top, bottom, width",
    transitionDuration: ".2s, .2s, .35s",
    transitionTimingFunction: "linear, linear, ease",
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    overflowY: "visible",
    position: "relative",
    float: "right",
    ...transition,
    maxHeight: "100%",
    width: "100%",
    overflowScrolling: "touch",
  },
  content: {
    marginTop: "70px",
    padding: "30px 15px",
    minHeight: "calc(100vh - 123px)",
  },
  container: { ...containerFluid },
  map: {
    marginTop: "70px",
  },
  mainPanelSidebarMini: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerMiniWidth}px)`,
    },
  },
  mainPanelWithPerfectScrollbar: {
    overflow: "hidden !important",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
});

export default appStyle;
