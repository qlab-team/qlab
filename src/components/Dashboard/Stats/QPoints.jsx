import React from "react";
// components
import Title from "../Title";
// material ui
import { withStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
// redux
import { connect } from "react-redux";
import { compose } from "redux";
// Actions
import { getProfile } from "../../../store/actions/profileActions";

function preventDefault(event) {
  event.preventDefault();
}

const styles = theme => ({
  depositContext: {
    flex: 1
  },
  points: {
    fontSize: "4.5rem"
  }
});

class QPoints extends React.Component {
  componentDidMount() {
    this.props.getProfile();
  }
  render() {
    const { classes, profile } = this.props;
    return (
      <React.Fragment>
        <Title>qPoints</Title>
        <Typography className={classes.points} component="p" variant="h4">
          {profile.q_points}
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
)(QPoints);
