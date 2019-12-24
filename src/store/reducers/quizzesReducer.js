const initState = [];

const quizzesReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_QUIZZES": {
      return [...action.quizzes];
    }
    default:
      return state;
  }
};

export default quizzesReducer;
