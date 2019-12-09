import React, { useEffect } from "react";
import { Grid, withStyles} from "@material-ui/core";
import { useState } from 'react'

import QuizAnswer from "./QuizAnswer";


const styles = {
  selected: {
    background: 'blue'
  }
}
const QuizAnswers = props => {
  const [correctSelector, changeCorrectSelector] = useState("")

  const updateSelector = (index) => {
    if(props.questionsDisabled === true) return;
    changeCorrectSelector(index)
  }
  const eraseHighlight = props.eraseHighlight;
  useEffect(() => {
    if(eraseHighlight === true) {
      changeCorrectSelector("")
      props.eraseAnswerHighlight()
      return;
    }
  },[eraseHighlight, props])

  return (
    <div>
      <Grid container>
        {props.answers.map((answer, index) => {
          return (
            <QuizAnswer
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
    </div>
  );
};

export default withStyles(styles)(QuizAnswers)