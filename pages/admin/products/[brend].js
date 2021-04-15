import React from "react";
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


import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";

function Products({ products }) {
  const { t } = useTranslation();
  const router = useRouter()
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(12);

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
      <GridContainer>
        {(rowsPerPage > 0
          ? products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          : products
        ).map(product =>
          <GridItem
            key={`${product._id}${product.brend}`}
            xs={12} sm={6} md={2}
            onClick={() => router.push(`/admin/products/product/${product._id}`)}>
            <Card style={{cursor:"pointer", minHeight: "310px"}}>
              <CardHeader stats icon>
                <div style={{
                  position: 'relative',
                  width: '100%',
                  maxHeight: '350px',
                  overflow: 'hidden',
                }}>
                  <img height="auto" width="100%" src={`data:${product.images.contentType};base64,${product.images.img}`} />
                </div>
                <h4 className={classes.cardTitle} style={{textAlign:"center", minHeight: "81px", wordBreak: "break-all"}}>
                  {t(`${product._id}.product`)}
                  {/*useTranslation()[1].language == "pl" ? t(`${product._id}.product`) : product.product*/}
                </h4>
                <h4 className={classes.cardTitle} style={{textAlign:"center"}}>
                  {product.price} BYR
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

  return {
    props: { products }
  }
}