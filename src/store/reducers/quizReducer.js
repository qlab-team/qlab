const initState = {};

const quizReducer = (state = initState, action) => {
  switch (action.type) {
    case "UPDATE_QUIZ_INFO": {
        console.log(action.quizId);
    }
    default:
      return state;
  }
};

export default quizReducer;
