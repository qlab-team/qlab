import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";
import QuizSelection from "./QuizSelection";
export default class QuizChooser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Quizzes: [
        {
          quizId: "quiz1",
          quizTitle: "Planets Level 1"
        },
        {
          quizId: "quiz2",
          quizTitle: "Planets Level 2"
        },
        {
          quizId: "quiz3",
          quizTitle: "Planets Level 3"
        }
      ]
    };
  }
  // will get the quiz names & ID's from database
  // add it to local state and just pass it down
  render() {
    return (
      <div>
        <Paper>Which Quiz will you take?</Paper>
        <Grid container>
          {this.state.Quizzes.map(quiz => {
            return (
              <QuizSelection quizTitle={quiz.quizTitle} quizId={quiz.quizId} />
            );
          })}
        </Grid>
      </div>
    );
  }
}
