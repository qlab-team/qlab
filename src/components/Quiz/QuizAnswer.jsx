import React from "react";
import { Grid, Typography, withStyles, Container } from "@material-ui/core";
import { useRef, useEffect } from "react";

const styles = theme => ({
  Typography: {
    //padding: 20,
    paddingTop:60,
    fontSize: 40,
    [theme.breakpoints.down("xs")]: {
      fontSize: 20,
      height:40,
      borderRadius:20,
      paddingTop: 20,
    },
    borderRadius: 40,
    height: 150,
    background: "whitesmoke",
    color: "rgb(92, 27, 249)",
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
    "&:hover": {
      cursor: "pointer"
    },
    wordWrap:'break-word'
  },

  selected: {
    background: "rgb(92, 27, 249)",
    color: "whitesmoke"
  },

  Answer: {
    justify: "center",
    alignContent: "center",
    alignItems: "center",
    wordWrap:'break-word'
  }
});

function QuizAnswer(props) {
  const myRef = useRef(null);

  const colorChanger = (event, index) => {
    props.updateSelector(index);
  };

  useEffect(() => {
    if (props.index === props.correctSelector) {
      myRef.current.classList.add(props.classes["selected"]);
    } else {
      myRef.current.classList.remove(props.classes["selected"]);
    }
  });
  return (
    <Grid
      item
      xs={12}
      s={6}
      md={6}
      lg={6}
      xl={6}
      onClick={event => {
        colorChanger(event, props.index);
        props.getCurrentAnswer(props.answer, props.correctAnswer);
      }}
      className={props.classes.Answer}
    >

      <Container>
        <Typography
          
          variant="body2"
          ref={myRef}
          className={props.classes["Typography"]}
        >
          {props.answer}
        </Typography>
      </Container>
    </Grid>
  );
}

export default withStyles(styles)(QuizAnswer);

// event.target.classList.add(props.classes["selected"])
//ref={refContainer}
