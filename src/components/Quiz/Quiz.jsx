/////////////// IMPORTS
import React, { Component } from "react";
import { Paper } from "@material-ui/core";
import QuizAnswers from "./QuizAnswers";
import { connect } from "react-redux";

/////////////// COMPONENT
class QuizMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizInfo: [],
      currentQuestion: 0,
      quizTitle: "Planets Level 1", //will get this from the store afterwards
      Quiz: [
        {
          question: "How many Planets in the solar system?",
          answers: ["8", "7", "5", "10"],
          correctAnswer: "8"
        },
        {
          question: "Which Planet is the largest in the solar system?",
          answers: ["Mars", "Saturn", "Jupiter", "Mercury"],
          correctAnswer: "Jupiter"
        },

        {
          question: "Which planet is the closest to the sun?",
          answers: ["Mars", "Saturn", "Jupiter", "Mercury"],
          correctAnswer: "Mercury"
        }
      ]
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <div>
          <Paper>{this.state.Quiz[this.state.currentQuestion].question}</Paper>
          <QuizAnswers
            answers={this.state.Quiz[this.state.currentQuestion].answers}
            correctAnswer={
              this.state.Quiz[this.state.currentQuestion].correctAnswer
            }
          />
        </div>
      </div>
    );
  }
}

/////////////// REDUX
const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(QuizMain);
