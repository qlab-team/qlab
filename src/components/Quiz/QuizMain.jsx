import React, { Component } from 'react'
import { Paper } from '@material-ui/core'
import QuizAnswers from './QuizAnswers'
import {LinearProgress} from '@material-ui/core'
import CheckButton from './CheckButton'
import { connect } from 'react-redux'
import {getQuiz} from '../../store/actions/quizActions'
import AnswerValidator from './AnswerValidator'
class QuizMain extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loadedOrNot: false,
            quizLength: "hi",
            currentProgress: 0,
            currentQuestion: 0,
            currentAnswer: "",
            currentCorrectAnswer: "",
            answerConfirmation: "",
            quizTitle: "Planets Level 1", //will get this from the store afterwards
            Quiz: []
        }
    }

    componentDidMount() {
        this.props.getQuiz(this.props.quizId).then( res => {
            console.log(this.props.quiz)
            this.setState({Quiz: this.props.quiz.quiz_info})
            this.setState({quizLength: this.props.quiz.quiz_length })
            this.setState({loadedOrNot: true})
        })
    }

    getCurrentAnswer = (currentAnswer, currentCorrectAnswer) => {
        this.setState({currentAnswer, currentCorrectAnswer})
    }

    getAnswerConfirmation = (answerConfirmation) => {
        this.setState({answerConfirmation})
    }

    updateCurrentQuestion = () => {
        this.setState({currentQuestion: this.state.currentQuestion + 1})
    }

    updateProgressBar = () => {
        let progressAmount = (1 / this.state.quizLength) * 100 ;
        this.setState({currentProgress: this.state.currentProgress + progressAmount})
        console.log(this.state.currentProgress);
    }

    addQuizQuestionToEnd = () => {
        let updatedQuiz = this.state.Quiz;
        const currentQuestion = this.state.Quiz[this.state.currentQuestion]
        updatedQuiz.push(currentQuestion)
        this.setState({Quiz: updatedQuiz})
    }




    render() {
        let answerValidation ="";
        if(this.state.answerConfirmation !== "") {
            answerValidation = <AnswerValidator answerConfirmation ={this.state.answerConfirmation} />
        }

        let quizAfterAndBeforeLoading;
        if (this.state.loadedOrNot === false) {
            quizAfterAndBeforeLoading = <div>loading</div>
        } else {
            quizAfterAndBeforeLoading = <div>
            <div>
            <Paper>
                {this.state.Quiz[this.state.currentQuestion].question}
            </Paper>
    
            <QuizAnswers
            getCurrentAnswer={this.getCurrentAnswer} 
            answers={this.state.Quiz[this.state.currentQuestion].answers}
            correctAnswer={this.state.Quiz[this.state.currentQuestion].correct_answer}
            />
            </div>
            <LinearProgress variant="determinate" value={this.state.currentProgress}/>

            <CheckButton 
            getAnswerConfirmation={this.getAnswerConfirmation} 
            currentAnswer={this.state.currentAnswer} 
            currentCorrectAnswer={this.state.currentCorrectAnswer}
            updateCurrentQuestion={this.updateCurrentQuestion}
            addQuizQuestionToEnd={this.addQuizQuestionToEnd}
            updateProgressBar={this.updateProgressBar}
            />

            {answerValidation}

        </div> 
        }
        return(
        <div>
            {quizAfterAndBeforeLoading}
        </div> 
        )
    }
}



const mapStateToProps = (state) => {
    return {
        quizId: state.quiz.currentQuiz,
        quiz: state.quiz.quizInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        getQuiz: quizId => dispatch(getQuiz(quizId))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizMain)