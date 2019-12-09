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
    this.props.getProfile(this.props.auth);
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
    auth: state.firebase.auth,
    profile: state.profile
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getProfile: auth => dispatch(getProfile(auth))
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Profile);
