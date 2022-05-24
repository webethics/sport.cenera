import { Theme } from "@material-ui/core";
export const activitiesDetailStyle = (theme: Theme) => ({
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  appbar: {
    backgroundColor: "#fff",
    padding: "15px 15px 0 15px",
    position: "relative",
  },

  logoHolder: {
    textAlign: "center",
    "& img": {
      maxWidth: 280,
    },
  },

  headerPattren: {
    position: "absolute",
    height: 56,
    width: "100%",
    bottom: -30,
    left: 0,
    zIndex: -1,
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  footer: {
    backgroundColor: "#0079BC",
    padding: "20px 0",
    marginTop: "auto",
  },
});
