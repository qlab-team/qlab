const initState = {
  isDialogOpen: false,
  itemData: {},
  purchaseError: ""
};

const dialogReducer = (state = initState, action) => {
  switch (action.type) {
    case "OPEN_DIALOG": {
      return {
        ...state,
        isDialogOpen: action.open,
        itemData: action.data ? { ...action.data } : { ...state.itemData },
        purchaseError: action.error
      };
    }
    default:
      return state;
  }
};

export default dialogReducer;
