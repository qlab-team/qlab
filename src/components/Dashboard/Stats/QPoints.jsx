/////////////// IMPORTS
import React from "react";
// components
import Title from "../Title";
// material ui
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
// redux
import { connect } from "react-redux";
import { compose } from "redux";

/////////////// UTILITIES
function preventDefault(event) {
  event.preventDefault();
}

/////////////// STYLES
const useStyles = makeStyles(theme => ({
  depositContext: {
    flex: 1
  },
  points: {
    fontSize: "4rem"
  }
}));

/////////////// COMPONENT
const QPoints = props => {
  const classes = useStyles();
  const { user } = props;

  return (
    <React.Fragment>
      <Title>
        <span className="qPointsMark" style={{ fontSize: "smaller" }}>
          ℚ
        </span>
        Points
      </Title>
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
        <Link color="primary" href="#" onClick={preventDefault}>
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
