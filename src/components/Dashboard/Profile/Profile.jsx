/////////////// IMPORTS
import React from "react";
// import { useEffect } from "react";
// material ui
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
// redux
import { connect } from "react-redux";
import { compose } from "redux";
// actions

/////////////// STYLES
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3)
  },
  paper: {
    maxWidth: 900,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2)
  },
  bigAvatar: {
    width: "100px",
    height: "100px"
  },
  displayName: {
    fontSize: "52px"
  }
}));

/////////////// COMPONENT
const Profile = props => {
  const classes = useStyles();

  const { user, auth } = props;

  // useEffect(() => {
  //   if (user.isLoggedIn) {
  //     console.log(user, auth);
  //   }
  //   // eslint-disable-next-line
  // }, [user.isLoggedIn]);

  return (
    user.isLoggedIn && (
      <div className={classes.root}>
        {auth.isLoaded && (
          <Paper className={classes.paper}>
            <Grid
              container
              wrap="nowrap"
              spacing={2}
              alignItems="center"
              justify="space-between"
            >
              <Grid item>
                <Avatar
                  alt="useravatar"
                  src={auth.photoURL}
                  className={classes.bigAvatar}
                />
              </Grid>
              <Grid item xs>
                <Typography className={classes.displayName}>
                  {auth.displayName}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        )}
      </div>
    )
  );
};

/////////////// REDUX
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    user: state.user
  };
};

/////////////// EXPORTS
export default compose(connect(mapStateToProps))(Profile);
