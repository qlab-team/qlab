/////////////// IMPORTS
import React, { useEffect, useState } from "react";
//  material ui
import { Grid, withStyles, Typography } from "@material-ui/core";
// components
import QuizAnswer from "./QuizAnswer";

/////////////// STYLES
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

/////////////// COMPONENTS
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
        justify="space-around"
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

/////////////// EXPORTS
export default withStyles(styles)(QuizAnswers);
