export const getUserAndLogin = auth => {
  return (dispatch, getState, { getFirestore }) => {
    console.log("Get User and Login Called");
    // make async call to database
    const usersCollection = getFirestore().collection("users");
    const getUser = () => {
      usersCollection
        .where("auth_id", "==", auth.uid)
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log("No matching documents.");
            // createUser(auth, usersCollection);
            // getUser();
            return;
          }

          if (snapshot.size !== 1) {
            console.log("There should only be one user with this id.");
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
          console.log("Error getting documents", err);
        });
    };
    getUser();
  };
};

export const userLogout = authId => {
  return dispatch => {
    console.log("User Logout Called");
    dispatch({
      type: "USER_LOGOUT"
    });
  };
};

export const changeUsername = data => {
  return (dispatch, getState, { getFirestore }) => {
    console.log("Change Username Called");
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
        console.log("Username updated!");
      });
  };
};

export const getUserData = () => {
  return (dispatch, getState, { getFirestore }) => {
    console.log("Get User Data Called");
    // make async call to database
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
        console.log("Error getting documents", err);
      });
  };
};
