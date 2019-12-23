const initState = {
  items: [],
  itemData: {}
};

const storeReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_STORE_ITEMS": {
      return { ...state, items: [...action.storeItems] };
    }
    default:
      return state;
  }
};

export default storeReducer;
