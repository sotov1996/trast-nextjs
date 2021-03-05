/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import styles from "assets/jss/nextjs-material-dashboard/components/footerStyle.js";

export default function Footer(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
        <p className={classes.right}>
          <span>
            &copy; Copyright {1900 + new Date().getYear()}{" "}
              Trast
          </span>
        </p>
    </footer>
  );
}
