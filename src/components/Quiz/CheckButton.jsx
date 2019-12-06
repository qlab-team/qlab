import React from 'react'
import { Button }  from '@material-ui/core'



export default props => {
    let answerConfirmation = "";

    const answerChecker = () => {
        if(props.currentAnswer === props.currentCorrectAnswer) {
            answerConfirmation = <div>True</div>
            console.log(answerConfirmation)
        } else {
            answerConfirmation=<div>False</div>
            console.log(answerConfirmation)
        }
    }

    return (
        <React.Fragment>
        <Button onClick={answerChecker} variant="contained" color="primary">CHECK</Button>
        {answerConfirmation}
        </React.Fragment>
    )
}
