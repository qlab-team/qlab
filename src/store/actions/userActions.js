// const generateUser = authObject => {
//   return {
//     auth_id: authObject.uid,
//     username: authObject.email.split("@")[0],
//     q_points: 0,
//     q_score: 0,
//     quiz_total: 0,
//     created_at: new Date(),
//     investments: [],
//     last_quiz_done: new Date(),
//     q_score_history: [
//       { date: 1575817200, q_score: 90 },
//       { date: 1575730800, q_score: 50 },
//       { date: 1575644400, q_score: 80 },
//       { date: 1575558000, q_score: 60 },
//       { date: 1575471600, q_score: 45 },
//       { date: 1575298800, q_score: 35 }
//     ]
//   };
// };

// const createUser = (auth, usersCollection) => {
//   console.log("Creating User");
//   usersCollection
//     .add(generateUser(auth))
//     .then(() => {
//       console.log("Account Created");
//       return;
//     })
//     .catch(err => {
//       console.log("Error creating account", err);
//     });
// };

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

export const changeUserName = newUserName => {
  return (dispatch, getState, { getFirestore }) => {
    console.log("Change Username Called");
    const state = getState();
    const userAuthId = state.user.profile.auth_id;
    const usersCollection = getFirestore().collection("users");
    usersCollection.where("auth_id", "==", userAuthId).update({
      username: newUserName
    });
  };
};

export const getUserData = () => {
  return (dispatch, getState, { getFirestore }) => {
    console.log("Get User data Called");
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
