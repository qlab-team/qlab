import React from 'react'
import { withStyles }  from '@material-ui/core'

const styles = {
   Validator: {
   }
  };

function AnswerValidator (props) {
    return (
        <div className={props.classes.Validator}>{props.answerConfirmation}</div>
    )
}

export default withStyles(styles)(AnswerValidator);
