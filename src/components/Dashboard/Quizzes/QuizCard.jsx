import React from "react";
// actions
import { updateQuizInfo } from "../../../store/actions/quizActions";
// react-router
import { Link } from "react-router-dom";
// material ui
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
// redux
import { compose } from "redux";
import { Typography, Grid } from "@material-ui/core";
import Title from "../Title";
// styles
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  button: {
    background: "rgb(92,27,249)",
    margin: theme.spacing(3),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    borderRadius: 50,
    border: "solid white 1px",
    color: "#FFF",
    fontSize: 20,
    textTransform: "none",
    textDecoration: "none !important",
    padding: theme.spacing(2)
  }
});

// const classes = useStyles();

class QuizCard extends React.Component {
  loadQuiz = () => {
    this.props.updateCurrentQuiz(this.props.quizId);
    console.log(this.props.quizId);
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid
        className={classes.root}
        onMouseEnter={this.loadQuiz}
        container
        justify="space-around"
        direction="column"
      >
        <Title>{this.props.quizTitle}</Title>
        <Typography variant="body2">{this.props.quizDescription}</Typography>
        <Link
          className={classes.button}
          style={{ textDecoration: "none" }}
          to="/quiz"
        >
          start
        </Link>
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCurrentQuiz: quiz => dispatch(updateQuizInfo(quiz))
  };
};

export default compose(
  withStyles(styles),
  connect(null, mapDispatchToProps)
)(QuizCard);
