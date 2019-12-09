import React from "react";
import { useEffect } from "react";
// components
import QuizCard from "./QuizCard";
// material ui
import clsx from "clsx";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// actions
import { getQuizzes } from "../../../store/actions/quizzesActions";

// redux
import { connect } from "react-redux";
import { compose } from "redux";
// styles
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  paper: {
    padding: theme.spacing(3),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  }
}));

function Quizzes(props) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  useEffect(() => {
    console.log("mounted");
    props.getQuizzes();
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <Grid container spacing={3} wrap="wrap">
        {props.quizzes.map(quiz => {
          // console.log(quiz);
          return (
            <Grid item xs md={4}>
              <Paper className={fixedHeightPaper}>
                <QuizCard
                  quizTitle={quiz["quiz_title"]}
                  quizId={quiz["quiz_id"]}
                  quizDescription={quiz["quiz_description"]}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    quizzes: state.quizzes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getQuizzes: () => dispatch(getQuizzes())
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(Quizzes);
