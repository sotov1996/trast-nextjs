import React, { useEffect } from "react";
import { useRouter } from "next/router"
import { makeStyles } from "@material-ui/core/styles";
import Admin from "layouts/Admin.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import { useTranslation } from 'react-i18next';
import CardHeader from "components/Card/CardHeader.js";
import image from "../../../../assets/img/sidebar-4.jpg"
import i18n from 'i18next';

import CardBody from "components/Card/CardBody.js";

const styles = {
    cardCategoryWhite: {
        "&,& a,& a:hover,& a:focus": {
            color: "black",
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
        color: "black",
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
    cardImage: {
        position: 'relative',
        maxWidth: '300px',
        height: '400px',
        overflow: 'hidden',
    }
};

function Product({ product }) {
    const { t } = useTranslation();
    const router = useRouter()
    const useStyles = makeStyles(styles);
    const classes = useStyles();

    return (
        <Card>
            <CardBody>
                <h4 className={classes.cardTitleWhite}>
                {i18n.language == "pl" ? t(`${product[0]._id}.product`) : product[0].product}
                    {/*t(`${product[0]._id}.product`)*/}
                </h4>
                <p className={classes.cardCategoryWhite}>
                    {product[0].brend}
                </p>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                        <br />
                        <div className={classes.cardImage}>
                        <img height="350px" src={`data:${product[0].images.contentType};base64,${product[0].images.img}`} />
                        </div>

                    </GridItem>
                    <GridItem xs={12} sm={12} md={8}>
                        <h5 style={{ textAlign: "center" }}>
                        {i18n.language == "pl" ? t(`${product[0]._id}.description`) : product[0].description}
                            {/*t(`${product[0]._id}.description`)*/}
                        </h5>
                        <br />
                    </GridItem>
                </GridContainer>
                <br />
                <br />
            </CardBody>
        </Card>
    );
}
Product.layout = Admin;
export default Product;

export async function getServerSideProps({ params }) {
    const dev = process.env.NODE_ENV !== "production"
    const api = dev ? "http://localhost:3000" : 'https://trast-nextjs.herokuapp.com'
    const response = await fetch(`${api}/api/product/${params._id}`)
    const product = await response.json()

    return {
        props: { product }
    }
}