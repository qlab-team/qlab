import React, { Component } from 'react'
import { Grid, Paper } from "@material-ui/core";import QuizSelection from './QuizSelection'
export default class QuizChooser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            Quizzes: [
                {
                    quizId: 1,
                    quizTitle: "Planets Level 1", 
                },
                {
                    quizId: 3,
                    quizTitle: "Planets Level 2", 
                },
                {
                    quizId: 2,
                    quizTitle: "Planets Level 3", 
                }
            ]
        }
    }
    // will get the quiz names & ID's from database
    // add it to local state and just pass it down
    render() {

    return(
        <div>
            <Paper>Which Quiz will you take?</Paper>
            <Grid container>
                {this.state.Quizzes.map(quiz => {
                    return <QuizSelection quizTitle={quiz.quizTitle} quizId={quiz.quizId} />
                })}
            </Grid>

        </div>
    )
    }
}

/*
quiz: [
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
*/