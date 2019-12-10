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
            console.log("There should only be one user with this ID");
            return;
          }

          dispatch({
            type: "USER_LOGIN",
            user_id: snapshot.docs[0].id,
            profile: snapshot.docs[0].data()
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
    console.log("Logging User Out");
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
