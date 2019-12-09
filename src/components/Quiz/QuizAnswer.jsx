import React from 'react'
import { Grid, Typography, withStyles } from "@material-ui/core";
import {useRef, useEffect} from 'react'

const styles = theme =>( {
    Typography: {
      padding: 20,
      fontSize: 40,
      borderRadius:40,
      height: 100,
      textAlign: "center",
      justifyContent: "center",

      background: "whitesmoke",
      color: "rgb(92, 27, 249)",
      boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
      
      '&:hover': {
       cursor: "pointer"
       }
    },

    selected: {
        background: "rgb(92, 27, 249)",
        color: "whitesmoke"
    }
  });


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
          <Typography variant="body2" ref={myRef} className={props.classes["Typography"]}>{props.answer}</Typography>
        </Grid>
    )
}

export default withStyles(styles)(QuizAnswer);

// event.target.classList.add(props.classes["selected"])
//ref={refContainer}
