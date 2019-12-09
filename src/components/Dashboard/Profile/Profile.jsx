import React from "react";
// material ui
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
// import Paper from "@material-ui/core/Paper";
// redux
import { connect } from "react-redux";
import { compose } from "redux";
// Actions
import { getProfile } from "../../../store/actions/profileActions";
// styles
const styles = theme => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  }
});

class Profile extends React.Component {
  componentDidMount() {
    // Want to pass profile data from state.user(props.user).
    // But, now it can't get it. because it is undefined. reason is tyming...
    // ToDo: To change from local storage to redux in the future...
    // this.props.getProfile(this.props.user);
    this.props.getProfile();
  }
  render() {
    const { classes, profile } = this.props;
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          my name is {profile.displayName}
          {/* my score is {profile.displayName} */}
          <img src={profile.photoURL} />
        </Grid>
      </Grid>
    );
  }
}

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

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Profile);
