const getItems = () => {
  return (dispatch, getState, { getFirestore }) => {
    if (getState().user.isLoggedIn === false) return;
    const userId = getState().user.user_id;
    const usersCollection = getFirestore().collection("users");
    usersCollection
      .doc(userId)
      .get()
      .then(res => {
        dispatch({
          type: "GET_ITEMS",
          items: res.data().items,
          achievements: res.data().achievements
        });
      });
  };
};

export { getItems };
