const initState = {
  currentQuiz: "0"
};

const quizReducer = (state = initState, action) => {
  switch (action.type) {
    case "UPDATE_QUIZ_INFO": {
      return {
        ...state,
        currentQuiz: action.quizId
      };
    }
    case "GET_QUIZ": {
      return {
        ...state,
        quizInfo: action.quiz
      };
    }
    default:
      return state;
  }
};

export default quizReducer;
