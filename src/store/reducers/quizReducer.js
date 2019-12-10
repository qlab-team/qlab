const initState = {
  currentQuiz: '0',
}

const quizReducer = (state = initState, action) => {
  switch (action.type) {
    case "UPDATE_QUIZ_INFO": {
      //state.currentQuiz = action.quizId;
      return {
        ...state,
        currentQuiz: action.quizId
      };
    }

    case "GET_QUIZ": {
      //state.quizInfo = action.quiz
      return {
        ...state,
        quizInfo: action.quiz
      }
    }
    default:
      return state;
  }
};

export default quizReducer;
