/////////////// IMPORTS
import React, { useState } from "react";
// material ui
import { Button, withStyles } from "@material-ui/core";

/////////////// STYLES
const styles = {
  Confirmation: {
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
    height: 60,
    backgroundColor: "red",
    "&:hover": {
      backgroundColor: "blue"
    }
  },
  button: {
    margin: 30,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 50,
    fontSize: 20,
    paddingRight: 50,
    paddingLeft: 50,
    textTransform: "none",
    textDecoration: "none !important",
    padding: 20,
    color: "whitesmoke",
    transition: "ease-in-out 0.15s",
    background: "rgb(92, 27, 249)",
    "&:hover": {
      background: "whitesmoke",
      color: "rgb(92, 27, 249)"
    },
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)"
  }
};

function CheckButton(props) {
  const [buttonValue, setButtonValue] = useState("CHECK");

  const answerChecker = e => {
    if (props.userHasSelected === false) return;
    if (buttonValue === "NEXT") {
      props.resetSelections();
      props.eraseAnswerHighlight();
      props.changeBackgroundColor("reset");
      setButtonValue("CHECK");
      props.updateCurrentQuestion();
      props.getAnswerConfirmation("");
    } else if (props.currentAnswer === props.currentCorrectAnswer) {
      setButtonValue("NEXT");
      props.updateProgressBar();
      props.getAnswerConfirmation("true");
      props.changeBackgroundColor("true");
    } else {
      setButtonValue("NEXT");
      props.addQuizQuestionToEnd();
      props.getAnswerConfirmation("false");
      props.changeBackgroundColor("false");
    }
  };
  return (
    <React.Fragment>
      <Button
        className={props.classes.button}
        onClick={answerChecker}
        variant="contained"
        color="primary"
      >
        {props.answerValidation}
        {""}
        {buttonValue}
      </Button>
    </React.Fragment>
  );
}

/////////////// EXPORTS
export default withStyles(styles)(CheckButton);
