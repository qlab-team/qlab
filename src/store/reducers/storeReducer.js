const initState = {
  items: [],
  isDialogOpen: false,
  itemData: {}
};

const storeReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_STORE_ITEMS": {
      state.items = action.storeItems;
      return state;
    }
    case "OPEN_DIALOG": {
      return { ...state, isDialogOpen: action.open, itemData: action.data };
    }
    default:
      return state;
  }
};

export default storeReducer;
