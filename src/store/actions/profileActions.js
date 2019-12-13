const getItems = () => {
  return (dispatch, getState, { getFirestore }) => {
    console.log("Get Items Called");
    // make async call to database
    if (getState().user.isLoggedIn === false) return;
    const userId = getState().user.user_id;
    const usersCollection = getFirestore().collection("users");
    usersCollection
      .doc(userId)
      .get()
      .then(res => {
        dispatch({
          type: "GET_ITEMS",
          items: res.data().items
        });
      });
  };
};

export { getItems };
