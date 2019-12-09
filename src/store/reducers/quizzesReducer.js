const initState = [];

const quizzesReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_QUIZZES": {
      state = action.quizzes;
      return state;
    }
    default:
      return state;
  }
};

export default quizzesReducer;
