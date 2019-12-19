/////////////// IMPORTS
import React from "react";
import { withStyles, Typography } from "@material-ui/core";

/////////////// STYLES
const styles = {
  Validator: {
    color: "white",
    fontSize: 30
  }
};

/////////////// COMPONENT
function AnswerValidator(props) {
  let answerMessage = "";
  if (props.answerConfirmation === "true") answerMessage = "True!";
  else answerMessage = "False!";
  return (
    <Typography className={props.classes.Validator}>{answerMessage}</Typography>
  );
}

/////////////// EXPORTS
export default withStyles(styles)(AnswerValidator);
