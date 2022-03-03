export const activitiesPageStyle = () => ({
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
    bottom: -56,
    left: 0,
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  },

  footer: {
    backgroundColor: "#0079BC",
    padding: "20px 0",
  },
});
