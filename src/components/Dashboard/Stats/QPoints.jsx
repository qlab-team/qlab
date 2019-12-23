/////////////// IMPORTS
import React from "react";
// components
// material ui
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import { Typography, Tooltip } from "@material-ui/core/";
// redux
import { connect } from "react-redux";
import { compose } from "redux";

/////////////// STYLES
const useStyles = makeStyles(theme => ({
  depositContext: {
    flex: 1
  },
  points: {
    fontSize: "4rem"
  },
  tooltip: {
    fontSize: "1.4em"
  }
}));

/////////////// COMPONENT
const QPoints = props => {
  const classes = useStyles();
  const { user } = props;

  return (
    <React.Fragment>
      <Tooltip
        title={
          <span className={classes.tooltip}>
            ℚPoints are your currency! You can spend them on badges and climb
            the leaderboard.
          </span>
        }
        placement="top"
      >
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          <span className="qPointsMark" style={{ fontSize: "smaller" }}>
            ℚ
          </span>
          Points
        </Typography>
      </Tooltip>
      <Typography className={classes.points} component="p" variant="h4">
        {user.isLoggedIn && user.profile.q_points}
        <span className="qPointsMark" style={{ fontSize: "smaller" }}>
          <sup>ℚ</sup>
        </span>
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on {new Date().toLocaleDateString("en-US")}
      </Typography>
      <div>
        <Link
          style={{ textDecoration: "none", color: "white", cursor: "pointer" }}
          to="/dashboard/store"
        >
          Buy goodies
        </Link>
      </div>
    </React.Fragment>
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
export default compose(connect(mapStateToProps))(QPoints);
