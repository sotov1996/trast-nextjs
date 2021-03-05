import React from "react";
import Link from "next/link"
import { useRouter } from "next/router"
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const styles = {
  grid: {
    padding: "0 15px !important",
  },
};

export default function GridItem(props) {
  const { pathname } = useRouter()
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { children, ...rest } = props;
  return (
      <Grid item {...rest} className={classes.grid}>
        {children}
      </Grid>
  );
}

GridItem.propTypes = {
  children: PropTypes.node,
};
