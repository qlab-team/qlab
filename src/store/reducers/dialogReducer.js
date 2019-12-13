const initState = {
  isDialogOpen: false,
  data: {},
  error: ""
};

const dialogReducer = (state = initState, action) => {
  switch (action.type) {
    case "OPEN_DIALOG": {
      console.log(action.data);
      return {
        ...state,
        isDialogOpen: action.open,
        data: action.data ? { ...action.data } : { ...state.data },
        error: action.error
      };
    }
    default:
      return state;
  }
};

export default dialogReducer;
