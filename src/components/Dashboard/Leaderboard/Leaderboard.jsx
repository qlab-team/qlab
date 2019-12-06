import React from "react";
// components
import Leaders from "./Leaders";
// material ui
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
// redux
import { connect } from "react-redux";
import { compose } from "redux";
// Actions
import { getLeaderboard } from "../../../store/actions/leaderboardActions";
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

class Leaderboard extends React.Component {
  componentDidMount() {
    this.props.getLeaderboard();
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Leaders />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getLeaderboard: () => dispatch(getLeaderboard())
  };
};

export default compose(
  withStyles(styles),
  connect(null, mapDispatchToProps)
)(Leaderboard);
