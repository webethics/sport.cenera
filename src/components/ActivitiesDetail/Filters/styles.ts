import { alpha, Theme } from "@material-ui/core/styles";

export const filtersStyle = (theme: Theme) => ({
  Container: {
    "@media (min-width: 1280px)": {
      maxWidth: "1392px",
    },
  },
  formGroup: {
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      maxWidth: 292,
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
  Filters: {
    marginLeft: "auto",
    alignSelf: "center",
    "& svg": {
      fontSize: 40,
      color: "#000",
    },
  },
});
