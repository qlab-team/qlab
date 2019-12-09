const initState = {
  currentQuiz: "1"
};

const quizReducer = (state = initState, action) => {
  switch (action.type) {
    case "UPDATE_QUIZ_INFO": {
      state.currentQuiz = action.quizId;
      return state;
    }

    case "GET_QUIZ": {
      state.quizInfo = action.quiz["quiz_info"];
      return state;
    }
    default:
      return state;
  }
};

export default quizReducer;
