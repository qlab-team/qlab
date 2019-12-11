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
    padding: theme.spacing(2),
    overflow: "auto"
  },
  bigAvatar: {
    width: "100px",
    height: "100px"
  }
}));

/////////////// COMPONENT
const Profile = props => {
  const classes = useStyles();

  const { user, auth } = props;
  // console.log(user);
  // console.log(auth);
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
          <>
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
                <Grid item xs zeroMinWidth>
                  <Typography component="h2" variant="h3" color="primary">
                    {auth.displayName}({user.profile.username})
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
            <Paper className={classes.paper}>
              <Typography variant="h5">
                You have solved {user.profile.quiz_total} quizzes.
              </Typography>
              <Typography variant="body1">
                {user.profile.last_quiz_done.toDate().toDateString()}
              </Typography>
            </Paper>
          </>
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
