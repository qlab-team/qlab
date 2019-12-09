import React, { useEffect } from "react";
import { Grid, withStyles, Container, Typography } from "@material-ui/core";
import { useState } from 'react'


import QuizAnswer from "./QuizAnswer";


const styles = theme => ({
  Grid: {
    padding: theme.spacing(3),
},
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    marginBottom: 30,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    background:
      "linear-gradient(178deg, rgba(169,101,255,1) 0%, rgba(92,27,249,1) 100%)",
    color: "white",
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
    borderRadius: 50,
    
  },

  Title: {
    paddingTop:6,
    color: "white",
    fontSize:40
  }
})
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
    <React.Fragment>
      <Container className={props.classes.container}>

      <Typography className={props.classes.Title}>
        {props.quizQuestion}
      </Typography>

      <Grid spacing={3} wrap="wrap" container>
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
      </Container>
    </React.Fragment>
  );
};

export default withStyles(styles)(QuizAnswers)