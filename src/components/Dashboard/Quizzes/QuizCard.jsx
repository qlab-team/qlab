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
    margin: theme.spacing(3),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    borderRadius: 50,
    fontSize: 20,
    textTransform: "none",
    textDecoration: "none !important",
    padding: theme.spacing(2),
    color: "rgb(92, 27, 249)",
    transition: "ease-in-out 0.15s",
    background: "whitesmoke",
    "&:hover": {
      background: "rgb(92, 27, 249)",
      color: "whitesmoke"
    },
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)"
  }
});

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
          Start
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
