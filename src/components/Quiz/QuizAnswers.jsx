import React, { useEffect } from "react";
import { Grid, withStyles, Typography } from "@material-ui/core";
import { useState } from "react";
import QuizAnswer from "./QuizAnswer";

const styles = theme => ({
  Grid: {
    // padding: theme.spacing(3)
  },
  Title: {
    margin: 40,
    color: "white",
    fontSize: 40
  }
});
const QuizAnswers = props => {
  const [correctSelector, changeCorrectSelector] = useState("");

  const updateSelector = index => {
    if (props.questionsDisabled === true) return;
    changeCorrectSelector(index);
  };

  const eraseHighlight = props.eraseHighlight;
  useEffect(() => {
    if (eraseHighlight === true) {
      changeCorrectSelector("");
      props.eraseAnswerHighlight();
      return;
    }
  }, [eraseHighlight, props]);

  return (
    <React.Fragment>
      <Typography className={props.classes.Title}>
        {props.quizQuestion}
      </Typography>
      <Grid
        item
        container
        alignItems="center"
<<<<<<< Updated upstream
        justify="space-between"
=======
        justify="space-around"
>>>>>>> Stashed changes
        spacing={4}
      >
        {props.answers.map((answer, index) => {
          return (
            <QuizAnswer
              updateUserHasSelected={props.updateUserHasSelected}
              eraseAnswerHighlight={props.eraseAnswerHighlight}
              updateSelector={updateSelector}
              correctSelector={correctSelector}
              correctAnswer={props.correctAnswer}
              getCurrentAnswer={props.getCurrentAnswer}
              index={index}
              key={index}
              answer={answer}
            ></QuizAnswer>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(styles)(QuizAnswers);
