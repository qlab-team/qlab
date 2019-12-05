import React from "react";
// components
import QuizCard from "./QuizCard";
// material ui
import clsx from "clsx";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  }
}));

export default function Quizzes() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  let state = {
    // will get Quizzes from database
    Quizzes: [
      {
        quizId: 1,
        quizTitle: "Planets Level 1"
      },
      {
        quizId: 3,
        quizTitle: "Planets Level 2"
      },
      {
        quizId: 2,
        quizTitle: "Planets Level 3"
      }
    ]
  };

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        {state.Quizzes.map(quiz => {
          return (
            <Paper className={fixedHeightPaper}>
              <QuizCard quizTitle={quiz.quizTitle} quizId={quiz.quizId} />
            </Paper>
          );
        })}
      </Grid>
    </React.Fragment>
  );
}
