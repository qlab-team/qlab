/////////////// IMPORTS
import React from "react";
// redux
import { connect } from "react-redux";
import { compose } from "redux";
// actions
import { userLogout } from "../../store/actions/userActions";
// react-router
import { Redirect } from "react-router-dom";
// firebase
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../../config/fbConfig";
// material ui
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

/////////////// STYLES
const useStyles = makeStyles(theme => ({
  paper: {
    color: "#FFF",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  textField: {
    color: "white"
  },
  avatar: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(8),
    background:
      "linear-gradient(178deg, rgba(169,101,255,1) 0%, rgba(92,27,249,1) 100%)"
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
    padding: theme.spacing(3),
    borderRadius: 20
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background:
      "linear-gradient(178deg, rgba(169,101,255,1) 0%, rgba(92,27,249,1) 100%)"
  },
  lockOutlinedIcon: {}
}));

/////////////// UTILITIES
const uiConfig = {
  signInFlow: "popup",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccessWithAuthResult: () => {
      return false;
    }
  }
};
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

/////////////// COMPONENT
const Login = props => {
  const classes = useStyles();

  const { auth } = props;

  if (auth.isLoaded) {
    if (!auth.isEmpty) {
      console.log("Redirecting to Dashboard");
      return <Redirect to="/dashboard/stats" />;
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            className={classes.textField}
            InputProps={{
              className: classes.textField
            }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            className={classes.textField}
            InputProps={{
              className: classes.textField
            }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs={12}>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

/////////////// REDUX
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    user: state.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    userLogout: () => dispatch(userLogout())
  };
};

/////////////// EXPORTS
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Login);
