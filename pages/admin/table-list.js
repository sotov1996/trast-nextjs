import React, { useState, useEffect } from "react";
import { useRouter } from "next/router"
import { useTranslation } from 'react-i18next';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
//import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";

import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Button from '@material-ui/core/Button';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import CardBody from "components/Card/CardBody.js";

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
  paper: {
    marginTop: 100,
    marginBottom: 200,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: 8,
    backgroundColor: "#00acc1",
    margin:"0 auto"
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  submit: {
    minHeight: 50,
    color: "white",
    marginTop: 10,
    background: "#61a8db"

  },
  alert: {
    position: "relative",
    left: "50%"
  },
  text: {
    color: "#555555",
    marginTop: 10,
    textAlign: "center"
  }
};

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const TableList = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter()
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  //const { t, i18n } = useTranslation();

  const API = "/api"

  const [credential, setCredential] = useState({
    login: '',
    password: ''
  })

  const label = {
    name: t('admin.name'),
    login: t('admin.login'),
    password: t('admin.password'),
    signin: t('admin.signin')
  }
  const [open, setOpen] = React.useState(false);

  const addUser = async (e) => {
    e.preventDefault()
    await axios.get(`${API}/login?login=${credential.login}&password=${credential.password}`)
      .then(res => {
        if (res.data == "error") {
          setOpen(true);
        } else {
          sessionStorage.setItem("token", Math.random().toString(36).slice(2))
          router.push(`/admin/adminTab/adminTab`)
        }
      })
  }

  const handleChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Card>
      <CardBody>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4} style={{margin: "0 auto"}}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography className={classes.text} component="h1" variant="h5">
              {label.name}
            </Typography>
            <form className={classes.form} onSubmit={addUser}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="login"
                label={label.login}
                name="login"
                autoComplete="login"
                autoFocus
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label={label.password}
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
              <Button
                className={classes.submit}
                type="submit"
                fullWidth variant="contained"
                variant="contained"
                color="primary">
                {label.signin} </Button>
            </form>
          </GridItem>
        </GridContainer>
        <br />
        <br />
      </CardBody>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert className={classes.alert} onClose={handleClose} severity="error">
          {t("snackbar.error")}
        </Alert>
      </Snackbar>
    </Card>
  );
}

TableList.layout = Admin;

export default TableList;