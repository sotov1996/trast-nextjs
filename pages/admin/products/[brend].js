import React, { useEffect } from "react";
import { useRouter } from "next/router"
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from 'react-i18next';
import Admin from "layouts/Admin.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import TablePagination from '@material-ui/core/TablePagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import i18n from 'i18next';


import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";

function Products({ products, currently }) {
  const { t } = useTranslation();
  const router = useRouter()
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(12);
  const [price, setPrice] = React.useState('RUB');
  const [wind, setWind] = React.useState();

  useEffect(() => {
    if(window.innerWidth <= 1400){
      return setWind(3)
    }
    return setWind(2)
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  if(!products){
    return <><CircularProgress /></>
  }
  return (
    <div>
      <span style={{paddingRight: "10px"}}>{t(`curruntcly`)}</span>
      <select onChange={(e) => setPrice(e.target.value)} defaultValue="RUB">
            <option id="RUB">RUB</option>
            <option id="BYN">BYN</option>
          </select>
      <GridContainer>
        {(rowsPerPage > 0
          ? products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          : products
        ).map(product =>
          <GridItem
            key={`${product._id}${product.brend}`}
            xs={12} sm={6} md={wind}
            onClick={() => router.push(`/admin/products/product/${product._id}`)}>
            <Card style={{cursor:"pointer", minHeight: "310px"}}>
              <CardHeader stats icon>
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '212px',
                  overflow: 'hidden',
                  margin: '15px 0',
                  display: "flex",
                  alignItems: "center"
                }}>
                  <img height="170px" style={{margin: "0 auto"}} src={`data:${product.images.contentType};base64,${product.images.img}`} />
                </div>
                <h4 className={classes.cardTitle} style={{textAlign:"center", minHeight: "108px", wordWrap: "break-word"}}>
                  {/*t(`${product._id}.product`)*/}
                  {i18n.language == "pl" ? t(`${product._id}.product`) : product.product}
                </h4>
                <h4 className={classes.cardTitle} style={{textAlign:"center", fontWeight:"bold"}}>
                  { currently.length && price === "RUB" ? (product.price * currently[0].RUB).toFixed(0)
                    : currently.length && price === "BYN" ? (product.price * currently[0].BYN).toFixed(0)
                    : product.price
                  } {price}
                </h4>
              </CardHeader>
              <br />
            </Card>
          </GridItem>
        )}
      </GridContainer>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <TablePagination
          rowsPerPageOptions={[ 12, 18, 24]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          className={classes.brendPagination}
        />
      </div>
    </div>
  );
}
Products.layout = Admin;
export default Products;

export async function getServerSideProps({ params }) {
  const dev = process.env.NODE_ENV !== "production"
  const api = dev ? "http://localhost:3000" : 'https://trast-nextjs.herokuapp.com'
  const response = await fetch(`${api}/api/${params.brend}`)
  const products = await response.json()

  const responseCurrently = await fetch(`${api}/api/getCurrency`)
  const currently = await responseCurrently.json()

  return {
    props: { products, currently }
  }
}