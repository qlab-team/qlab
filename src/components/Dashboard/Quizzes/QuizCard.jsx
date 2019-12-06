import React from "react";
// components
import Title from "../Title";
// material ui
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Typography, Grid } from "@material-ui/core";

// actions
import updateQuizInfo from "../../../store/actions/quizActions";
// react-router
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
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
}));

const QuizCard = props => {
  const loadQuiz = () => {
    // props.updateCurrentQuiz(props.quizId);
    console.log(props.quizId);
  };

  const classes = useStyles();

  return (
    <Grid
      className={classes.root}
      container
      justify="space-around"
      direction="column"
    >
      <Title>{props.quizTitle}</Title>
      <Typography variant="body2">{props.quizDescription}</Typography>
      <Link
        onMouseEnter={loadQuiz}
        className={classes.button}
        style={{ textDecoration: "none" }}
        to="/quiz"
      >
        start
      </Link>
    </Grid>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    updateCurrentQuiz: quiz => dispatch(updateQuizInfo(quiz))
  };
};

export default connect(null, mapDispatchToProps)(QuizCard);
