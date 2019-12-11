const initState = [];

const storeReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_STORE_ITEMS": {
      state = action.storeItems;
      return state;
    }
    default:
      return state;
  }
};

export default storeReducer;
