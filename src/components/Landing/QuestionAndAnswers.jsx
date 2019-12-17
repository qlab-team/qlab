import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  answer: {
    marginTop: 15,
    fontSize: 20,
    marginBottom: 30,
    paddingLeft: 200,
    paddingRight: 200
  },
  question: {
    fontWeight: "bold",
    fontSize: 35
  }
}));

const QuestionAndAnswers = props => {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <Typography className={classes.question}>{props.question}</Typography>

      <Typography className={classes.answer}>{props.answer}</Typography>
    </Grid>
  );
};

export default QuestionAndAnswers;
