const initState = {
  items: [],
  itemData: {}
};

const storeReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_STORE_ITEMS": {
      state.items = action.storeItems;
      return { ...state, items: [...action.storeItems] };
    }
    default:
      return state;
  }
};

export default storeReducer;
