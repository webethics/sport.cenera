export const configurationStyle = () => ({
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    marginBottom: 15,
  },
  pos: {
    marginBottom: 12,
  },
  icon: {
    minWdth: "20px",
  },
  listIcon: {
    minWidth: "30px",
  },
  listItem: {
    paddingLeft: 0,
    paddingRight: 0,
    "& button": {
      backgroundColor: "#FF9800",
      color: "#ffffff",
      padding: "7px 10px",
      lineHeight: 1,
      fontSize: "14px",
      fontWeight: "400",
    },
  },

  listItemText: {
    "& span": {
      fontSize: "14px",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 300,
    },
  },

  cardActions: {
    display: ["-webkit-box", "-ms-flexbox", "flex"],
    borderTop: "1px solid #ececec",
    marginTop: "-10px",
    WebkitBoxOrient: "vertical",
    WebkitBoxDirection: "normal",
    msFlexDirection: "column",
    flexDirection: "column",
    WebkitBoxAlign: "stretch",
    msFlexAlign: "stretch",
    alignItems: "stretch",
    "& button": {
      color: "#FFF",
      border: "none",
      cursor: "pointer",
      margin: ".3125rem 1px !important",
      padding: "12px 30px",
      position: "relative",
      fontSize: "12px",
      minWidth: "auto",
      boxShadow: "0 2px 2px 0 rgba(153, 153, 153, 0.14), 0 3px 1px -2px rgba(153, 153, 153, 0.2), 0 1px 5px 0 rgba(153, 153, 153, 0.12)",
      minHeight: "auto",
      textAlign: "center",
      transition: "box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      fontWeight: 400,
      lineHeight: 1.42857143,
      whiteSpace: "nowrap",
      willChange: "box-shadow, transform",
      touchAction: "manipulation",
      borderRadius: "3px",
      letterSpacing: "0",
      textTransform: "uppercase",
      verticalAlign: "middle",
      backgroundColor: "rgb(0, 172, 193)",
      "&:hover": {
        color: "#FFF",
        boxShadow: "0 12px 20px -10px rgba(0, 172, 193,.28), 0 4px 20px 0 rgba(0, 0, 0,.12), 0 7px 8px -5px rgba(0, 172, 193,.2)",
        backgroundColor: "#00acc1",
      },
    },
  },
});
