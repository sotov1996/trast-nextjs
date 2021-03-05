import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
//import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import TextField from '@material-ui/core/TextField';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios';
import Button from "@material-ui/core/Button";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  btn: {
    background: "#61a8db", 
    color: "white", 
    minHeight: 50, 
    marginTop: 10
  },
  alert: {
    position: "relative",
    left: "50%"
  },
};

function Alert(props) {
  return <MuiAlert elevation={2} variant="filled" {...props} />;
}

function UserProfile() {
  const { t } = useTranslation();
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const [newUser, setNewUser] = useState(
    {
      title: "",
      description: "",
    }
  );
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  //const { t, i18n } = useTranslation();

  let label = {
    title: t('feedback.title'),
    description: t('feedback.description'),
    send: t('feedback.send'),
    name: t('feedback.name'),
    event: t('feedback.event'),
  }

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/feedback", newUser)
      .then(res => {
        setNewUser({ title: "", description: "" })
        setOpenSnackbar(true);
      })
  }

  const closeSnacbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card color="">
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <h4 style={{fontWeight:400, fontSize:20}}>{label.name}</h4>
                  <TextField
                    label={label.title}
                    id="postal-code"
                    name="title"
                    fullWidth
                    onChange={handleChange}
                    value={newUser.title}
                  />
                  <br />
                  <br />
                  <TextField
                    label={label.description}
                    name="description"
                    id="about-me"
                    name="description"
                    fullWidth
                    multiline
                    rows={6}
                    value={newUser.description}
                    onChange={handleChange}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button variant="contained"
                className={classes.btn}
                color="primary"
                type="submit"
                onClick={(e) => handleSubmit(e)}>{label.send}</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={closeSnacbar}>
          <Alert className={classes.alert} onClose={closeSnacbar} severity="success">
            {label.event}
          </Alert>
        </Snackbar>
      </GridContainer>
    </div>
  );
}

UserProfile.layout = Admin;

export default UserProfile;
