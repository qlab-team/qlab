const initState = {
  currentQuiz: "0"
};

const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_ITEMS": {
      //state.currentQuiz = action.quizId;
      return {
        ...state,
        items: action.items
      };
    }
    default:
      return state;
  }
};

export default profileReducer;
