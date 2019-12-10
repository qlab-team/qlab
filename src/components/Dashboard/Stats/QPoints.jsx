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

const useStyles = makeStyles(theme => ({
  depositContext: {
    flex: 1
  },
  points: {
    fontSize: "4.5rem"
  }
}));

const QPoints = props => {
  const classes = useStyles();
  const { user } = props;

  return (
    <React.Fragment>
      <Title>qPoints</Title>
      <Typography className={classes.points} component="p" variant="h4">
        {user.isLoggedIn && user.profile.q_points}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on {new Date().toDateString()}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Buy goodies
        </Link>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    user: state.user
  };
};

export default compose(connect(mapStateToProps))(QPoints);
