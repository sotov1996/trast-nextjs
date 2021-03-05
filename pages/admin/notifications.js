/*eslint-disable*/
import React from "react";
import { useTranslation } from 'react-i18next';
// nodejs library to set properties for components
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

function Notifications() {
  const { t } = useTranslation();
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const defaultCenter = { lat: 52.1014, lng: 23.761 };

  const defaultOptions = { scrollwheel: false };

  const RegularMap = withScriptjs(
    withGoogleMap(props => (
      <GoogleMap
        defaultZoom={16}
        defaultCenter={defaultCenter}
        defaultOptions={defaultOptions}
      >
        <Marker position={defaultCenter} />
      </GoogleMap>
    ))
  );

  const loadingElementStyle = { height: '100%' };
  const containerElementStyle = { height: '70vh' };
  const mapElementStyle = { height: '100%' };

  return (
    <>
      <Card>
        <CardBody>
        <h4 style={{ fontWeight: 400, fontSize: 20 }}>{t("contact.contact")}</h4>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h5>OOO SLM-TREST2</h5>
              <br />
              <a href="mailto: slm-trast@tut.by">slm-trast@tut.by</a>
              <h5>+375291336336</h5>
              <h5>{t("contact.adress1")}</h5>
              <h5>{t("contact.hours")} : {t("contact.hours1")}</h5>
              <h5>{t("contact.sklad")} : <p>+375293327025 (A1)</p><p>+375298428282 (МТС)</p></h5>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <h5>SLM-TRAST Sp. z o.o.</h5>
              <br />
              <a href="mailto: info@slm-trast.pl">info@slm-trast.pl</a>
              <h5>+48604222999</h5>
            </GridItem>
          </GridContainer>
          <br />
          <br />
        </CardBody>
      </Card>
      <div style={{ height: '70vh', width: '70%', margin: "0 auto" }}>
        <RegularMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB-Jy4cJ0k4AwF-k1JY_AhyRVzyeb4g8oA"
          loadingElement={<div style={loadingElementStyle} />}
          containerElement={<div style={containerElementStyle} />}
          mapElement={<div style={mapElementStyle} />}
        />
      </div>

    </>
  );
}

Notifications.layout = Admin;

export default Notifications
