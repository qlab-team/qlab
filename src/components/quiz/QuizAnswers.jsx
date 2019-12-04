import React from "react";
import { Grid, Paper } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

const styles = {
  Paper: {
    backgroundColor: red,
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
    height: 60
  }
};

const answerValidator = (e) => {
  console.log(e.target);
}
export default props => {
  return (
    <div>
      
      <Grid container>
        <Grid item xs={6}>
          <Paper onClick={answerValidator}style={styles.Paper}>{props.answers[0]}</Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper style={styles.Paper}>{props.answers[1]}</Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper style={styles.Paper}>{props.answers[2]}</Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper style={styles.Paper}>{props.answers[3]}</Paper>
        </Grid>
      </Grid>
    </div>
  );
};
