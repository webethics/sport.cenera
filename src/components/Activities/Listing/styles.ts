import { blackColor } from "@cenera/common/styles/common-styles";
import dotpattrenH from "@cenera/assets/images/dotpattren-h.svg";

export const listingStyle = (theme: any) => ({
  listing: {
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
      backgroundImage: `url(${dotpattrenH})`,
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
      backgroundImage: `url(${dotpattrenH})`,
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
    height: 218,
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
});
