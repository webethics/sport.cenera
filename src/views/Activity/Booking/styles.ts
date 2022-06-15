import { Theme } from "@material-ui/core";

export const styles = (theme: Theme) => ({
  container: {
    margin: "0 auto",
    "& .custom-form-control": {
      maxWidth: "100% !important",
    },
    "& .datepicker": {
      maxWidth: "100% !important",
    },
  },

  cardContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #bfbfbf",
    padding: "10px",
    marginBottom: "10px",
  },

  circularProgress: {
    display: "block",
    margin: "auto",
  },
  errorLabel: {
    color: `#f64953`,
    fontSize: `12px`,
    fontWeight: `500`,
    display: "block",
    marginTop: "-12px",
  },
  btnContainer: {
    margin: "36px auto",
    display: "flex",
    width: "60%",
    justifyContent: "center",
  },
  editBtnContainer: {
    margin: "20px auto 0",
    display: "flex",
    width: "60%",
    justifyContent: "center",
  },
  btnSubmit: {
    flex: 1,
    margin: "0 100px",
  },
  editLocationBtn: {
    flex: 1,
    margin: 0,
  },
  btnDelete: {
    flex: 1,
    margin: "0 24px",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  datePicker: {
    fontSize: "12px",
  },

  textColor: {
    color: "#1769ff",
    marginLeft: "6px",
  },

  rightFormContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageUploadContainer: {
    flex: 1,
  },
  imgBtnContainers: {
    display: "flex",
    flexDirection: "row",
    "& > label": {
      margin: "0 12px",
    },
  },
  fileUploadFormControl: {
    margin: "0 auto",
    width: "max-content",
    display: "block",
  },
  fileInput: {
    display: "none",
  },

  // Mui-selected: {
  //   background-color: #fff,
  // },
  teamLogo: {
    maxWidth: "40%",
    margin: "24px auto",
    display: "block",
  },

  recuring_custom_check: {
    "& MuiTypography-root": {
      fontSize: "12px",
    },
  },

  dateButton: {
    // color: "none",
    background: "none",
    // margin: "0px",
    padding: "0px",
    boxShadow: "none",
    // borderRadius: "100%",

    width: "32px",
    height: "32px",
    display: "block",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #ddd",
    margin: "5px",
    borderRadius: "50%",
    fontSize: "12px",
    fontWeight: "400",
    color: "#565656",
    lineHeight: "0",

    "&:focus": {
      boxShadow: "0 5px 10px -5px #9e9e9e",
      background: "#cfcfcf",
      color: "#3c4858",
    },
    "&:hover": {
      boxShadow: "0 5px 10px -5px #9e9e9e",
      color: "#3c4858",
      background: "#cfcfcf",
    },
    "&.Mui-focuVisible": {
      boxShadow: "0 5px 10px -5px #9e9e9e",
      background: "#cfcfcf",
      color: "#3c4858",
    },
    "&.active_dates": {
      boxShadow: "0 5px 10px -5px #9e9e9e",
      borderColor: "#00acc1",
      backgroundColor: "#00acc1",
      color: "#fff",
    },
  },
});
