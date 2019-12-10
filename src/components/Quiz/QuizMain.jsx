import React, { Component } from "react";
//import { Typography } from '@material-ui/core'
import QuizAnswers from "./QuizAnswers";
import { LinearProgress, Grid } from "@material-ui/core";
import CheckButton from "./CheckButton";
import { connect } from "react-redux";
import { getQuiz } from "../../store/actions/quizActions";
import AnswerValidator from "./AnswerValidator";
import QuizFinished from "./QuizFinished";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "redux";

const styles = {
  Validator: {
    backgroundColor:
      "linear-gradient(178deg, rgba(169,101,255,1) 0%, rgba(92,27,249,1) 100%)",
    height: 20,
    borderRadius: 50,
    maxWidth: "90vw",
    margin: 30
  },
  QuizMain: {
    minHeight: "100vh",
    background:
      "linear-gradient(178deg, rgba(169,101,255,1) 0%, rgba(92,27,249,1) 100%)",
    color: "white",
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)"
  }
};

class QuizMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userHasSelected: false,
      quizPoints: 10,
      answersDisabled: false,
      eraseHighlight: false,
      quizView: "",
      loadedOrNot: false,
      quizLength: "hi",
      currentProgress: 0,
      currentQuestion: 0,
      currentAnswer: "",
      currentCorrectAnswer: "",
      answerConfirmation: "",
      quizTitle: "Planets Level 1", //will get this from the store afterwards
      Quiz: []
    };
  }

  componentDidMount() {
    this.props.getQuiz(this.props.quizId).then(res => {
      console.log(this.props.quiz);
      this.setState({ Quiz: this.props.quiz.quiz_questions });
      this.setState({ quizLength: this.props.quiz.quiz_length });
      this.setState({ loadedOrNot: true });
      this.setState({ quizPoints: this.props.quiz.quiz_points });
    });
  }

  getCurrentAnswer = (currentAnswer, currentCorrectAnswer) => {
    this.setState({ currentAnswer, currentCorrectAnswer });
  };

  getAnswerConfirmation = answerConfirmation => {
    this.setState({ answerConfirmation });
  };

  updateCurrentQuestion = () => {
    this.setState({ currentQuestion: this.state.currentQuestion + 1 });
  };

  updateProgressBar = () => {
    let progressAmount = (1 / this.state.quizLength) * 100;
    this.setState({
      currentProgress: this.state.currentProgress + progressAmount
    });
    if (this.state.currentProgress >= 99 - progressAmount) {
      this.setState({ quizView: "finished" });
    }
  };

  toggleAnswerSelections = () => {
    this.setState({ questionsDisabled: !this.state.questionsDisabled });
  };

  addQuizQuestionToEnd = () => {
    let updatedQuiz = this.state.Quiz;
    const currentQuestion = this.state.Quiz[this.state.currentQuestion];
    updatedQuiz.push(currentQuestion);
    this.setState({ Quiz: updatedQuiz });
  };

  eraseAnswerHighlight = () => {
    this.setState({ eraseHighlight: !this.state.eraseHighlight });
  };

  render() {
    const { classes } = this.props;

    let answerValidation = "";
    if (this.state.answerConfirmation !== "") {
      answerValidation = (
        <AnswerValidator answerConfirmation={this.state.answerConfirmation} />
      );
    }

    let quizView;

    if (this.state.quizView === "finished") {
      quizView = <QuizFinished quizPoints={this.state.quizPoints} />;
    } else if (this.state.loadedOrNot === false) {
      quizView = <div>loading</div>;
    } else {
      quizView = (
        <Grid
          className={classes.QuizMain}
          container
          direction="column"
          alignItems="center"
          justify="space-around"
        >
          <Grid item>
            <QuizAnswers
              quizQuestion={
                this.state.Quiz[this.state.currentQuestion].question
              }
              questionsDisabled={this.state.questionsDisabled}
              getCurrentAnswer={this.getCurrentAnswer}
              answers={this.state.Quiz[this.state.currentQuestion].answers}
              correctAnswer={
                this.state.Quiz[this.state.currentQuestion].correct_answer
              }
              eraseHighlight={this.state.eraseHighlight}
              eraseAnswerHighlight={this.eraseAnswerHighlight}
            />
            <LinearProgress
              variant="determinate"
              className={classes.Validator}
              value={this.state.currentProgress}
            />
          </Grid>
          <Grid item>
            <CheckButton
              getAnswerConfirmation={this.getAnswerConfirmation}
              currentAnswer={this.state.currentAnswer}
              currentCorrectAnswer={this.state.currentCorrectAnswer}
              updateCurrentQuestion={this.updateCurrentQuestion}
              addQuizQuestionToEnd={this.addQuizQuestionToEnd}
              updateProgressBar={this.updateProgressBar}
              toggleAnswerSelections={this.toggleAnswerSelections}
              eraseAnswerHighlight={this.eraseAnswerHighlight}
            />
          </Grid>
          <Grid item minHeight={90}>
            {answerValidation}
          </Grid>
        </Grid>
      );
    }
    return <div>{quizView}</div>;
  }
}

const mapStateToProps = state => {
  return {
    quizId: state.quiz.currentQuiz,
    quiz: state.quiz.quizInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getQuiz: quizId => dispatch(getQuiz(quizId))
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(QuizMain);
