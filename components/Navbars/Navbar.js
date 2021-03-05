import React, { useEffect, useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import { useTranslation } from 'react-i18next';
import i18next from 'i18next'
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import Button from "components/CustomButtons/Button.js";
import Buttonlanguages from '@material-ui/core/Button';

import styles from "assets/jss/nextjs-material-dashboard/components/headerStyle.js";
import Buttons from '@material-ui/core/Button';

export default function Header(props) {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { pathname, asPath } = router
  const [brend, setBrend] = React.useState('')
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  useEffect(async () => {
    if (pathname == "/admin/products/product/[_id]") {
      let path = asPath.split("/").pop()
      const response = await fetch(`/api//product/${path}`)
      const products = await response.json()
      setBrend(products[0].brend)
    }
  })

  /*function makeBrand() {
    var name = t(`header`);
    props.routes.map((prop) => {
      if (router.route.indexOf(prop.layout + prop.path) !== -1) {
        name = t(`menu.${prop.name}`);
      }
      return null;
    });
    return name;
  }*/

  const handleclick = (lang) => {
    i18n.changeLanguage(lang)
  }
  return (
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.container}>
          <div style={{ position: "relative", width: "75%", textAlign: "center", left: "14%", fontWeight: 400 }}>
            <h4 >{t("information1")}<br/>{t("information2")}</h4>
          </div>
        <div className={classes.flex}>
          {pathname == "/admin/products/product/[_id]"
            ? <Button color="transparent"
            style={{position:"absolute", left:"10px",top:"35%"}}
              className={classes.title}
              onClick={() => router.push(`/admin/products/${brend}`)}
            >{t("navbar")}</Button>
            : null}
        </div>
        <div style={{ marginRight: 20, display: "flex", flexDirection: "column", position:"absolute", right: 0, top:35 }}>
          <button style={{ marginBottom: 4, cursor: "pointer" }} onClick={() => handleclick('pl')}>PL</button>
          <button onClick={() => handleclick('ru')}>RU</button>
        </div>
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object),
};
