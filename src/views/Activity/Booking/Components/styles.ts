import { blackColor, sectionSpacer } from "@cenera/common/styles/common-styles";
import { alpha, Theme } from "@material-ui/core/styles";
import { selectStyles } from "@cenera/common/styles/select-styles";
export const styles = (theme: Theme) => ({
  errorLabel: {
    color: `#f64953`,
    fontSize: `12px`,
    fontWeight: `500`,
    display: "block",
    marginTop: "-12px",
  },
  bgContainer: {
    position: "relative",
    zIndex: 1,
  },

  Container: {
    "@media (min-width: 1280px)": {
      maxWidth: "66.666667%",
      flexBasis: "66.666667%",
      margin: "auto",
      padding: "0",
    },
  },

  tableContainer: {
    ...sectionSpacer,
  },
  table: {
    minWidth: 700,
    "& td": {
      paddingTop: "10px",
      paddingBottom: "10px",
      color: "#484848",
      "@media(max-width:767px)": {
        whiteSpace: "nowrap",
        padding: "10px",
        fontSize: "10px",
      },
    },
    "& th": {
      "@media(max-width:767px)": {
        whiteSpace: "nowrap",
        padding: "10px 5px",
        fontSize: "10px",
      },
    },
  },

  label: {
    fontWeight: "bold",
    color: blackColor,
  },
  customeTableRow: {
    "& th": {
      backgroundColor: "#F7F5F5",
      color: blackColor,
    },
    "& td": {
      backgroundColor: "#F7F5F5",
      color: blackColor,
      fontWeight: "500",
      lineHeight: "1.5rem",
    },
  },

  topTableRow: {
    backgroundColor: "#0079BC",
    textTransform: "uppercase",
    "& td": {
      backgroundColor: "#0079BC",
      textTransform: "uppercase",
      color: "#ffffff",
      fontWeight: "500",
    },
  },
  matched: {
    fontWeight: 500,
    color: "#0079BC",
  },
  bottomTableRow: {
    "& td": {
      border: "none",
    },
  },
  ...selectStyles(),

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
});

export const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  transition: "all",
  p: 4,
  overflow: "scroll",
  height: "95%",

  "@media (max-width: 1280px)": {
    width: "80%",
  },
};

export const editLocation = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  transition: "all",
  p: 4,
  overflow: "auto",

  "@media (max-width: 1280px)": {
    width: "80%",
  },
};

export const filtersStyle = (theme: Theme) => ({
  // filterWrap: {
  //   padding: "0 15px",
  // },

  formGroup: {
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      maxWidth: 260,
    },
    [theme.breakpoints.down("lg")]: {
      width: "50%",
      maxWidth: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  formControl: {
    width: "100%",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#fff",
    border: "1px solid rgba(0, 0, 0, 0.23)",
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },

    width: "100%",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: "17.5px 14px",
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    minHeight: "1.1876em",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  filters: {
    marginLeft: "auto",
    display: "flex",
    alignSelf: "center",
    alignItems: "center",
    minWidth: "200px",

    [theme.breakpoints.down("lg")]: {
      marginLeft: "0",
    },
  },
});
