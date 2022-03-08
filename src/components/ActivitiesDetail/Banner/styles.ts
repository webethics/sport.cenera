import { whiteColor, sectionSpacer } from "@cenera/common/styles/common-styles";

export const bannerStyle = () => ({
  banner: {
    backgroundColor: "#0079BC",
    padding: "calc(15px + 26px) 0 calc(15px + 56px) 0",
    position: "relative",
    textAlign: "center",
    ...sectionSpacer,
    "@media (max-width: 767px)": {
      padding: "40px 0 60px 0",
    },
    "& h1": {
      fontSize: "1.5rem",
      color: whiteColor,
      fontWeight: "bold",
      textTransform: "uppercase",
      "@media (min-width: 768px)": {
        fontSize: "2.5rem",
      },
      "@media (min-width: 1400px)": {
        fontSize: "3rem",
      },
    },
  },
  bannerPattren: {
    position: "absolute",
    height: 56,
    width: "100%",
    bottom: 0,
    left: 0,
    transform: "scaleY(-1)",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  },
});
