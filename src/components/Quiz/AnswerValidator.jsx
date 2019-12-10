import React from 'react'
import { withStyles, Typography }  from '@material-ui/core'

const styles = {
   Validator: {
    color: "white",
    fontSize: 30
   }
  };

function AnswerValidator (props) {
    let answerMessage = "";
    if(props.answerConfirmation === "true") answerMessage="True!"
    else answerMessage = "False!"
    return (
        <Typography className={props.classes.Validator}>{answerMessage}</Typography>
    )
}

export default withStyles(styles)(AnswerValidator);
