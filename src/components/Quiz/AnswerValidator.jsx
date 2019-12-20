/////////////// IMPORTS
import React from "react";
import { makeStyles } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
/////////////// STYLES
const useStyles = makeStyles(theme => ({
  true: {
    fill: "lime",
    fontSize: 45,
    marginRight: 10,
    transition: "linear 1s"
  },
  false: {
    fill: "orangered",
    fontSize: 45,
    marginRight: 10,
    transition: "linear 1s"
  }
}));

/////////////// COMPONENT
function AnswerValidator(props) {
  const classes = useStyles();
  let answerMessage = "";
  if (props.answerConfirmation === "true") answerMessage = "True!";
  else answerMessage = "False!";
  return answerMessage === "True!" ? (
    <CheckCircleIcon className={classes.true} />
  ) : (
    <CancelIcon className={classes.false} />
  );
}

/////////////// EXPORTS
export default AnswerValidator;
