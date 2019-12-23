/////////////// IMPORTS
import React, { Component } from "react";
// components
import QuizAnswers from "./QuizAnswers";
import CheckButton from "./CheckButton";
import QuizFinished from "./quizFinished/QuizFinished";
import AnswerValidator from "./AnswerValidator";
// redux
import { connect } from "react-redux";
import { compose } from "redux";
//actions
import { getQuiz } from "../../store/actions/quizActions";
// material ui
import { withStyles } from "@material-ui/core/styles";
import { LinearProgress, Grid } from "@material-ui/core";

/////////////// STYLES
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
    padding: 30,
    background:
      "linear-gradient(178deg, rgba(169,101,255,1) 0%, rgba(92,27,249,1) 100%)",
    minHeight: "100vh",
    color: "white"
  },
  progress: {
    minWidth: "90vw"
  },
  correctSelection: {
    background: "limegreen"
  },
  wrongSelection: {
    background: "red"
  }
};

/////////////// COMPONENT
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
      quizTitle: "",
      Quiz: []
    };
    this.mainViewRef = React.createRef();
  }

  componentDidMount() {
    this.props.getQuiz(this.props.quizId).then(res => {
      this.setState({
        Quiz: this.props.quiz.quiz_questions,
        quizLength: this.props.quiz.quiz_length,
        loadedOrNot: true,
        quizPoints: this.props.quiz.quiz_points
      });
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

  updateUserHasSelected = () => {
    this.setState({ userHasSelected: true });
  };

  resetSelections = () => {
    this.setState({ userHasSelected: false });
  };

  changeBackgroundColor = answerConfirmation => {
    if (answerConfirmation === "true") {
      this.mainViewRef.current.classList.add(
        this.props.classes.correctSelection
      );
    } else if (answerConfirmation === "false") {
      this.mainViewRef.current.classList.add(this.props.classes.wrongSelection);
    } else {
      this.mainViewRef.current.classList.remove(
        this.props.classes.wrongSelection
      );
      this.mainViewRef.current.classList.remove(
        this.props.classes.correctSelection
      );
    }
  };

  addQuizQuestionToEnd = () => {
    let updatedQuiz = this.state.Quiz;
    const currentQuestion = this.state.Quiz[this.state.currentQuestion];
    updatedQuiz.push(currentQuestion);
    this.setState({ Quiz: updatedQuiz });
  };

  render() {
    const { classes } = this.props;

    let answerValidation;

    if (this.state.answerConfirmation !== "") {
      answerValidation = (
        <AnswerValidator answerConfirmation={this.state.answerConfirmation} />
      );
    }

    let quizView;

    if (this.state.quizView === "finished") {
      quizView = <QuizFinished quizPoints={this.state.quizPoints} />;
    } else if (this.state.loadedOrNot === false) {
      quizView = <div></div>;
    } else {
      quizView = (
        <React.Fragment>
          <Grid
            className={classes.QuizMain}
            ref={this.mainViewRef}
            container
            direction="column"
            alignItems="center"
            justify="space-around"
          >
            <QuizAnswers
              updateUserHasSelected={this.updateUserHasSelected}
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

            <Grid item className={classes.progress}>
              <LinearProgress
                variant="determinate"
                className={classes.Validator}
                value={this.state.currentProgress}
              />
              <CheckButton
                userHasSelected={this.state.userHasSelected}
                resetSelections={this.resetSelections}
                getAnswerConfirmation={this.getAnswerConfirmation}
                currentAnswer={this.state.currentAnswer}
                currentCorrectAnswer={this.state.currentCorrectAnswer}
                updateCurrentQuestion={this.updateCurrentQuestion}
                addQuizQuestionToEnd={this.addQuizQuestionToEnd}
                updateProgressBar={this.updateProgressBar}
                toggleAnswerSelections={this.toggleAnswerSelections}
                eraseAnswerHighlight={this.eraseAnswerHighlight}
                answerValidation={answerValidation}
                changeBackgroundColor={this.changeBackgroundColor}
              />
            </Grid>
          </Grid>
        </React.Fragment>
      );
    }
    return <React.Fragment>{quizView}</React.Fragment>;
  }
}

/////////////// REDUX
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

/////////////// EXPORTS
export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(QuizMain);
