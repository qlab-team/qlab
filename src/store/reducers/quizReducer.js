import initState from '../initState'

const quizReducer = (state = initState, action) => {
  switch (action.type) {
    case "UPDATE_QUIZ_INFO": {
        state.currentQuiz = action.quizId;
        console.log(state);
        break
    }
    default:
      return state;
  }
};

export default quizReducer;
