import React, { Component } from 'react'
import { Paper } from '@material-ui/core'
import QuizAnswers from './QuizAnswers'
import {LinearProgress} from '@material-ui/core'
import CheckButton from './CheckButton'
import { connect } from 'react-redux'
import {getQuiz} from '../../store/actions/quizActions'

class QuizMain extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentProgress: 80,
            currentQuestion: 0,
            currentAnswer: "",
            currentCorrectAnswer: "",
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
                },

            ]
        }
    }

    componentDidMount() {
        this.props.getQuiz(this.props.quizId);
        this.setState({currentCorrectAnswer: this.state.Quiz[this.state.currentQuestion].correctAnswer})
        //update the state with this info
        //for now just using dummy data
    }

    getCurrentAnswer = (currentAnswer) => {
        this.setState({currentAnswer})
    }



    render() {
        return(
        <div>
            <div>
            <Paper>
                {this.state.Quiz[this.state.currentQuestion].question}
            </Paper>
    
            <QuizAnswers
            getCurrentAnswer={this.getCurrentAnswer} 
            answers={this.state.Quiz[this.state.currentQuestion].answers}
            correctAnswer={this.state.Quiz[this.state.currentQuestion].correctAnswer}
            />
            </div>
            <LinearProgress variant="determinate" value={this.state.currentProgress}/>

            <CheckButton currentAnswer={this.state.currentAnswer} currentCorrectAnswer={this.state.currentCorrectAnswer}/>

        </div> 
        )
    }
}



const mapStateToProps = (state) => {
    return {
        quizId: state.quiz.currentQuiz
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        getQuiz: quizId => dispatch(getQuiz(quizId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizMain)