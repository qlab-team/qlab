import React, { Component } from "react";
// components
import Title from "../Title";
// material ui
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
// actions
import {updateQuizInfo} from "../../../store/actions/quizActions";
// react-router
import { Link } from "react-router-dom";

class QuizCard extends Component {
  loadQuiz = () => {
    this.props.updateCurrentQuiz(this.props.quizId);
  };

  render() {
    return (
      <React.Fragment>
        {/* <Title>{this.props.quizTitle}</Title> */}
        <Grid item xs={4}>
          <Link style={{ textDecoration: "none", color: "white" }} to="/quiz">
            <Title onClick={this.loadQuiz}>Quiz</Title>
          </Link>
        </Grid>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCurrentQuiz: quiz => dispatch(updateQuizInfo(quiz))
  };
};

export default connect(null, mapDispatchToProps)(QuizCard);
