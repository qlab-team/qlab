/////////////// IMPORTS
import React from "react";
import { useEffect } from "react";
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
import { getProfile } from "../../../store/actions/profileActions";

/////////////// STYLES
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3)
  },
  paper: {
    maxWidth: 400,
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
  // Want to pass profile data from state.user(props.user).
  // But, now it can't get it. because it is undefined. reason is tyming...
  // ToDo: To change from local storage to redux in the future...
  // this.props.getProfile(this.props.user);
  useEffect(() => {
    props.getProfile();
    // eslint-disable-next-line
  }, []);

  const { profile } = props;
  return (
    <div className={classes.root}>
      {(() => {
        if (profile.photoURL) {
          return (
            <Paper className={classes.paper}>
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                  <Avatar
                    alt="useravatar"
                    src={profile.photoURL}
                    className={classes.bigAvatar}
                  />
                </Grid>
                <Grid item xs>
                  <Typography className={classes.displayName}>
                    {profile.displayName}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          );
        }
      })()}
    </div>
  );
};

/////////////// REDUX
const mapStateToProps = state => {
  return {
    profile: state.profile
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getProfile: () => dispatch(getProfile())
  };
};

/////////////// EXPORTS
export default compose(connect(mapStateToProps, mapDispatchToProps))(Profile);
