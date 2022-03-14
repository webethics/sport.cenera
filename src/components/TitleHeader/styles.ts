import { blackColor } from "@cenera/common/styles/common-styles";
export const titleStyle = (theme: any) => ({
  titleHolder: {
    marginBottom: 60,
  },
  titleSubHeader: {
    fontSize: "2rem",
    margin: theme.spacing(0),
  },
  titleHeader: {
    fontSize: "1.5rem",
    color: blackColor,
    fontWeight: 700,
    margin: theme.spacing(0),
    "@media (min-width: 768px)": {
      fontSize: "2rem",
    },
    "@media (min-width: 992px)": {
      fontSize: "2.5rem",
    },
    "@media (min-width: 1200px)": {
      fontSize: "3rem",
    },
    "@media (min-width: 1400px)": {
      fontSize: "4rem",
    },
  },
});
