import React from 'react'
import { Grid, Paper, withStyles } from "@material-ui/core";
import {useRef, useEffect} from 'react'

const styles = {
    Paper: {
      padding: 20,
      marginTop: 10,
      marginBottom: 10,
      height: 60,

      '&:hover': {
          background: 'blue'
       }
    },

    selected: {
        background: "red"
    }
  };




function QuizAnswer(props) {
    const myRef = useRef(null);

    const colorChanger = (event, index) => {
        props.updateSelector(index)
    }

    useEffect (() => {
        console.log('updated');
        if(props.index === props.correctSelector) {
            myRef.current.classList.add(props.classes["selected"])
        } else {
            myRef.current.classList.remove(props.classes["selected"])

        }
    })
    return(
        <Grid item xs={6} onClick={ (event) => { colorChanger(event,props.index); props.getCurrentAnswer(props.answer, props.correctAnswer);}}>
          <Paper ref={myRef} className={props.classes["Paper"]}>{props.answer}</Paper>
        </Grid>
    )
}

export default withStyles(styles)(QuizAnswer);

// event.target.classList.add(props.classes["selected"])
//ref={refContainer}
