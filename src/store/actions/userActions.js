export const getUserAndLogin = auth => {
  return (dispatch, getState, { getFirestore }) => {
    const usersCollection = getFirestore().collection("users");
    const getUser = () => {
      usersCollection
        .where("auth_id", "==", auth.uid)
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            return;
          }

          if (snapshot.size !== 1) {
            return;
          }

          dispatch({
            type: "USER_LOGIN",
            user_id: snapshot.docs[0].id,
            profile: snapshot.docs[0].data(),
            photoURL: auth.photoURL
          });
        })
        .catch(err => {
          console.error("Error getting documents", err);
        });
    };
    getUser();
  };
};

export const userLogout = authId => {
  return dispatch => {
    dispatch({
      type: "USER_LOGOUT"
    });
  };
};

export const changeUsername = data => {
  return (dispatch, getState, { getFirestore }) => {
    const state = getState();
    const user = state.user;
    const usersCollection = getFirestore().collection("users");
    usersCollection
      .doc(user.user_id)
      .update({
        username: data.newUsername
      })
      .then(() => {
        dispatch({ type: "CHANGE_USERNAME", newUsername: data.newUsername });
      });
  };
};

export const getUserData = () => {
  return (dispatch, getState, { getFirestore }) => {
    const state = getState();
    const user_id = state.user.user_id;
    const usersCollection = getFirestore().collection("users");

    if (!user_id) return;
    usersCollection
      .doc(user_id)
      .collection("invested_in_me")
      .get()
      .then(collection => {
        let investors = collection.docs.map(doc => {
          return doc.data();
        });
        dispatch({ type: "GET_INVESTORS", investors });
      })
      .catch(err => {
        console.error("Error getting documents", err);
      });
  };
};
