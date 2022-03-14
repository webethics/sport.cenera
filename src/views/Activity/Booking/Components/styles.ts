import { blackColor, sectionSpacer } from "@cenera/common/styles/common-styles";
import { selectStyles } from '@cenera/common/styles/select-styles';
export const styles = () => ({
  errorLabel: {
    color: `#f64953`,
    fontSize: `12px`,
    fontWeight: `500`,
    display: 'block',
    marginTop: '-12px',
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
});

export const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  transition: 'all',
  p: 4, 
}

