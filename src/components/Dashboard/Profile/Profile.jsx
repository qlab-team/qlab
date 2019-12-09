import React from "react";
// material ui
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
// import Paper from "@material-ui/core/Paper";
// redux
import { connect } from "react-redux";
import { compose } from "redux";
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

export default class Profile extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          Profile!
        </Grid>
      </Grid>
    );
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     getLeaderboard: () => dispatch(getLeaderboard())
//   };
// };

// export default compose(
//   withStyles(styles),
//   connect(null, mapDispatchToProps)
// )(Profile);
