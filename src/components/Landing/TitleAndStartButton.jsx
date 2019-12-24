/////////////// IMPORTS
import React from "react";
// redux
import { connect } from "react-redux";
import { compose } from "redux";
// react-router
import { Redirect } from "react-router-dom";
// firebase
import firebase from "../../config/fbConfig";
// material ui
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

/////////////// STYLES
const useStyles = makeStyles(theme => ({
  title: {
    fontSize: 130,
    color: "white",
    textShadow: "7px 7px 0px #C275FF",
    marginBottom: 6,
    fontFamily: "Aquino",
    opacity: 0
  },
  tagline: {
    fontSize: 30,
    color: "white",
    textShadow: "2px 2px 0px #C275FF",
    marginBottom: 6
  },
  button: {
    background:
      "linear-gradient(45deg, rgba(169,101,255,1) 0%, rgba(92,27,249,1) 100%)",
    borderRadius: 50,
    color: "#FFF",
    fontSize: 20,
    textTransform: "none",
    textDecoration: "none !important",
    padding: "10px 50px 10px 50px",
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)"
  }
}));

/////////////// COMPONENT
const TileAndStartButton = props => {
  const classes = useStyles();

  const { auth } = props;

  if (auth.isLoaded) {
    if (!auth.isEmpty) {
      return <Redirect to="/dashboard/stats" />;
    }
  }

  const googleLogin = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(obj => {
        return <Redirect to="/dashboard/stats" />;
      })
      .catch(error => {
        console.error("err :", error);
      });
  };

  return (
    <Box
      height={300}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      className={classes.root}
    >
      <Typography className={classes.title} variant="h1">
        QLAB
      </Typography>
      <Typography className={classes.tagline} variant="h2">
        Where effort's the currency.
      </Typography>
      <Button className={classes.button} onClick={googleLogin}>
        Sign in with Google
      </Button>
    </Box>
  );
};

/////////////// REDUX
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

/////////////// EXPORTS
export default compose(connect(mapStateToProps))(TileAndStartButton);
