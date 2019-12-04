import React, { Component } from 'react'
import { Grid, Paper } from "@material-ui/core";
import { connect } from 'react-redux'
import updateQuizInfo from '../../store/actions/quizActions'


class QuizSelection extends Component  {

    

    loadQuiz = () => {
        this.props.updateCurrentQuiz(this.props.quizId)
    }
    render() {

    return(
        <Grid item xs={6}>
          <a href="/quiz"><Paper onClick={this.loadQuiz}>{this.props.quizTitle}</Paper></a>
        </Grid>
    )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        updateCurrentQuiz: quiz => dispatch(updateQuizInfo(quiz))
    }
}

export default connect(null, mapDispatchToProps)(QuizSelection)