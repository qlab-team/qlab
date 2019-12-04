import React, { Component } from 'react'
import { Paper } from '@material-ui/core'
import QuizAnswers from './QuizAnswers'
import {LinearProgress} from '@material-ui/core'
import CheckButton from './CheckButton'
export default class QuizMain extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
                },

            ]
        }
    }

    render() {
        return(
        <div>
            <div>
            <Paper>
                {this.state.Quiz[this.state.currentQuestion].question}
            </Paper>
    
            <QuizAnswers 
            answers={this.state.Quiz[this.state.currentQuestion].answers}
            correctAnswer={this.state.Quiz[this.state.currentQuestion].correctAnswer}
            />
            </div>
            <LinearProgress variant="determinate" value="80"/>

            <CheckButton />

        </div> 
        )
    }
} 