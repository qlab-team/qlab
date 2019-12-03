export const getUser = user => {
  return (dispatch, getState, { getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    firestore
      .collection("users")
      .add({
        ...user,
        username: "eriko",
        points: 2,
        createdAt: new Date()
      })
      .then(() => {
        dispatch({ type: "USER_SUCCESS" });
      });
  };
};
