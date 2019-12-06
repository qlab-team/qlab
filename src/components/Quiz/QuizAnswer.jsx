import React from 'react'
import { Grid, Paper, withStyles } from "@material-ui/core";


const styles = {
    Paper: {
      padding: 20,
      marginTop: 10,
      marginBottom: 10,
      height: 60,
      backgroundColor: "white",
      '&:hover': {
          backgroundColor: 'blue !important'
       }
    },

    selected: {
        backgroundColor: "blue !important"
    }
  };

const colorChanger = (event) => {
    console.log(styles.Paper.backgroundColor)

    styles.Paper.backgroundColor = "blue"
}


function QuizAnswer(props) {
    return(
        <Grid item xs={6} onClick={ (event) => { colorChanger(event); props.getCurrentAnswer(props.answer, props.correctAnswer);}}>
          <Paper className={props.classes.Paper}>{props.answer}</Paper>
        </Grid>
    )
}

export default withStyles(styles)(QuizAnswer);
