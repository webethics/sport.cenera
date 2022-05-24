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
    height: "100%",
    overflowY: "auto",
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
    overflow: "scroll",
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
});

export default appStyle;
