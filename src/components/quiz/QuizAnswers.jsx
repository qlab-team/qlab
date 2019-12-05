import React from "react";
import { Grid} from "@material-ui/core";

import QuizAnswer from './QuizAnswer'



export default props => {
  return (
    <div>
      
      <Grid container>
          {props.answers.map((answer, index) => {
            return <QuizAnswer key={index} answer={answer}></QuizAnswer>
          })}
      </Grid>
    </div>
  );
};
