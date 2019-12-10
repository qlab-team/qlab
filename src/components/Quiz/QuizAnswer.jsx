import React from "react";
import { Grid, Typography, withStyles, Container } from "@material-ui/core";
import { useRef, useEffect } from "react";

const styles = theme => ({
  Typography: {
    fontSize: 40,
    [theme.breakpoints.down("xs")]: {
      fontSize: 20,
      borderRadius: 20
    },

    wordWrap: "break-word"
  },

  selected: {
    background: "rgb(92, 27, 249) !important",
    color: "whitesmoke !important"
  },

  Answer: {
    margin: 10,
    borderRadius: 40,
    background: "whitesmoke",
    color: "rgb(92, 27, 249)",
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
    "&:hover": {
      cursor: "pointer"
    },
    justify: "center",
    alignContent: "center",
    alignItems: "center",
    wordWrap: "break-word"
  }
});

function QuizAnswer(props) {
  const myRef = useRef(null);

  const colorChanger = (event, index) => {
    props.updateSelector(index);
  };

  useEffect(() => {
    console.log("updated");
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
      s={5}
      md={5}
      lg={5}
      xl={5}
      ref={myRef}
      onClick={event => {
        colorChanger(event, props.index);
        props.getCurrentAnswer(props.answer, props.correctAnswer);
      }}
      className={props.classes.Answer}
      alignItems="center"
    >
      <Typography variant="body2" className={props.classes["Typography"]}>
        {props.answer}
      </Typography>
    </Grid>
  );
}

export default withStyles(styles)(QuizAnswer);

// event.target.classList.add(props.classes["selected"])
//ref={refContainer}
