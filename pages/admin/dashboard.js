import React, { useEffect, useState } from "react";
import { useRouter } from "next/router"
import { useTranslation } from 'react-i18next';
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
import Image from 'next/image'

const Dashboard = ({ brends }) => {
  //const { t } = useTranslation();
  const router = useRouter()
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  return (
    <Card>
      <CardBody>
        <GridContainer>
          {brends[0].map(brend =>
            <GridItem
              key={`${brend._id}${brend.brend}`}
              xs={12} sm={6} md={2}
              onClick={() => router.push(`/admin/products/${brend.brend}`)}>
              <Card style={{ cursor: "pointer" }}>
                <CardHeader stats icon>
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    overflow: 'hidden',
                  }}>
                    <img src={`${process.env.NODE_ENV}/public/images/${brend.logo}`}/>

                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3 className={classes.cardTitle}>
                      {brend.brend}
                    </h3>
                    <h3 className={classes.cardTitle}>
                      {brends[1][brend.brend]}
                    </h3>
                  </div>

                </CardHeader>
                <br />
              </Card>
            </GridItem>
          )}
        </GridContainer>
      </CardBody>
    </Card>
  );
}

Dashboard.layout = Admin;

export default Dashboard;

export async function getServerSideProps(context) {
  try {
    const dev = process.env.NODE_ENV !== "production"
    const api = dev ? "http://localhost:3000" : 'https://trast-nextjs.herokuapp.com'
    const response = await fetch(`${api}/api/adminBrend`)
    const brends = await response.json()

    return {
      props: { brends }
    }
  } catch (e) {
    console.log(e)
  }
}
