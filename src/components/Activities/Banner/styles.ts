import { whiteColor, sectionSpacer } from "@cenera/common/styles/common-styles";
import bannerBg from "@cenera/assets/images/listing-banner.jpg";

export const bannerStyle = () => ({
  banner: {
    backgroundImage: `url(${bannerBg})`,
    backgroundSize: "cover",
    backgroundPosition: "bottom center",
    padding: "calc(1% + 56px) 0 calc(1% + 56px) 0",
    position: "relative",
    ...sectionSpacer,
    "& h1": {
      fontSize: "2rem",
      color: whiteColor,
      fontWeight: "bold",
      textTransform: "uppercase",
      "@media (min-width: 768px)": {
        fontSize: "2.5rem",
      },
      "@media (min-width: 992px)": {
        fontSize: "3rem",
      },
      "@media (min-width: 1200px)": {
        fontSize: "4rem",
      },
      "@media (min-width: 1400px)": {
        fontSize: "4rem",
      },
    },
  },
  bannerPattren: {
    position: "absolute",
    height: 56,
    width: "100%",
    bottom: "-1px",
    left: 0,
    transform: "scaleY(-1)",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  },
});
