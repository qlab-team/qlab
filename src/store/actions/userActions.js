export const createUser = user => {
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
        dispatch({ type: "USER_LOGGED_IN" });
      });
  };
};

export const getUserAndLogin = authId => {
  return (dispatch, getState, { getFirestore }) => {
    // make async call to database
    const usersCollection = getFirestore().collection("users");
    usersCollection
      .where("auth_id", "==", authId)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log("No matching documents.");
          return;
        }

        if (snapshot.size !== 1) {
          console.log("There should only be one user with this ID");
          return;
        }

        dispatch({
          type: "USER_LOGIN",
          userProfile: snapshot.docs[0].data()
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  };
};

export const userLogout = authId => {
  return dispatch => {
    dispatch({
      type: "USER_LOGOUT"
    });
  };
};

// console.log(snapshot.docs);
// console.log(snapshot.size);

// snapshot.forEach(doc => {
//   console.log(doc.id, "=>", doc.data());
// });
