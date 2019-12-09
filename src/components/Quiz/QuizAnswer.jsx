import React from "react";
import { Grid, Paper, withStyles } from "@material-ui/core";

const styles = {
  Paper: props => ({
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
    height: 60,
    background: props.color
  })
};

function QuizAnswer(props) {
  return (
    <Grid
      item
      xs={6}
      onClick={() => props.getCurrentAnswer(props.answer, props.correctAnswer)}
    >
      <Paper onMouseEnter={() => {}} className={props.classes.Paper}>
        {props.answer}
      </Paper>
    </Grid>
  );
}

export default withStyles(styles)(QuizAnswer);
