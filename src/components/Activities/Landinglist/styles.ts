import { blackColor } from "@cenera/common/styles/common-styles";
// import dotpattrenH from "@cenera/assets/images/dotpattren-h.svg";

import landingbanner from "@cenera/assets/images/Banner.jpg";

// export const bannerStyle = () => ({
//   banner: {
//     backgroundImage: `url(${landingbanner})`,

export const landingStyle = (theme: any) => ({
  listing: {
    display: "flex",
    backgroundImage: `url(${landingbanner})`,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: "40px",
    overflow: "hidden",
    "@media (min-width: 992px)": {
      paddingBottom: "60px",
    },
  },
  listingContainer: {
    position: "relative",
    zIndex: 1,
    [theme.breakpoints.up("lg")]: {
      maxWidth: "1392px",
    },
    "&:before": {
      content: '""',
      display: "block",
      // backgroundImage: `url(${dotpattrenH})`,
      width: "324px",
      height: "154px",
      position: "absolute",
      top: "40px",
      left: "0",
      transform: "translateX(-50%)",
      zIndex: -1,
    },
    "&:after": {
      content: '""',
      display: "block",
      // backgroundImage: `url(${dotpattrenH})`,
      width: "324px",
      height: "154px",
      position: "absolute",
      bottom: "40px",
      right: "0",
      transform: "translateX(50%)",
      zIndex: -1,
    },
  },
  
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  
  card: {
    borderRadius: "11px 11px 0 0",
    boxShadow: "0px 4px 60px rgba(0, 0, 0, 0.07)",
  },
  media: {
    height: 218
  },
  cardTitle: {
    fonstSize: "18px",
    fontWeight: "500",
    color: blackColor,
  },
  cardDecription: {
    fonstSize: 12,
    color: blackColor,
  },
  homebanner: {
    minHeight: "calc(100vh - 144px)",
    flexWrap:"wrap",
    padding: "50px 0px",
  },
  loginsection:{
    background: "#fff",
    borderRadius: "5%",
    textAlign: "center",
    margin:"22px 52px",
    "@media (max-width: 575px)": {
      width: "90%",
    },
  },
  loginsectionbox: {
    minHeight: "320px",
    background: "#fff",
    width: "330px",
    borderRadius: "5%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: "50px 50px",
    "@media (max-width: 575px)": {
      width: "100%",
    },
  },
  loginimg:{
    background: "#fff",
    marginTop: "35px",
    marginBottom: "15px",
  },
  loginbutton:{
    borderRadius: "7px !important",
    width: "100%",
    padding: "17px 0px !important",
    fontSize: "18px !important",
    fontWeight: "600 !important",
  }
});

