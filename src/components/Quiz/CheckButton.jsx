import React, { useState } from 'react'
import { Button, withStyles }  from '@material-ui/core'

const styles = {
    Confirmation: {
      padding: 20,
      marginTop: 10,
      marginBottom: 10,
      height: 60,
      backgroundColor: 'red',
      '&:hover': {
          backgroundColor: 'blue'
       }
    }
  };

function CheckButton (props) {
    const [buttonValue, setButtonValue] = useState("CHECK");    

    let answerConfirmation = "";
    const answerChecker = (e) => {
        //if(props.userHasSelected === false) return;
        props.toggleAnswerSelections()
        if(buttonValue === "NEXT") {
            props.eraseAnswerHighlight()
            setButtonValue("CHECK")
            props.updateCurrentQuestion();
            props.getAnswerConfirmation("")
        }
        else if(props.currentAnswer === props.currentCorrectAnswer) {
            setButtonValue("NEXT")
            answerConfirmation = "true"
            props.updateProgressBar()
            props.getAnswerConfirmation(answerConfirmation)

        } else {
            setButtonValue("NEXT")
            answerConfirmation= "false"
            props.addQuizQuestionToEnd();
            props.getAnswerConfirmation(answerConfirmation)
        }
        
    }
    return (
        <React.Fragment>
        <Button onClick={answerChecker} variant="contained" color="primary">{buttonValue}</Button>
        </React.Fragment>
    )
}

export default withStyles(styles)(CheckButton);
