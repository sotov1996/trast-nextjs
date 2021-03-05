import {
  defaultFont,
  container,
  primaryColor,
  grayColor,
} from "assets/jss/nextjs-material-dashboard.js";

const footerStyle = {
  block: {
    color: "inherit",
    padding: "15px",
    textTransform: "uppercase",
    borderRadius: "3px",
    textDecoration: "none",
    position: "relative",
    display: "block",
    ...defaultFont,
    fontWeight: "500",
    fontSize: "12px",
  },
  left: {
    float: "left!important",
    display: "block",
  },
  right: {
    position: "relative",
    padding: "15px 0",
    fontSize: "15px",
  },
  footer: {
    width: "100%",
    display:"flex",
    justifyContent: "center",
    bottom: "0",
    padding: "15px 0",
    ...defaultFont,
  },
  container,
  a: {
    color: primaryColor,
    textDecoration: "none",
    backgroundColor: "transparent",
  },
  list: {
    marginBottom: "0",
    padding: "0",
    marginTop: "0",
  },
  inlineBlock: {
    display: "inline-block",
    padding: "0px",
    width: "auto",
  },
};
export default footerStyle;
