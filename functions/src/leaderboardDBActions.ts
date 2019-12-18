const functions = require("firebase-functions");

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");

const generateAllUsersBoard = (users: any) => {
  // const highestScoreUser = { id: "", score: 0 };
  // const lowestScoreUser = { id: "", score: 500 };

  const board = users.map((user: any) => {
    const userData = user.data();
    // If there is no photoURL, it sets to random avatar URL
    let photoURL = "https://joeschmoe.io/api/v1/random";
    if (userData.photoURL) photoURL = userData.photoURL;

    return {
      username: userData.username,
      user_id: user.id,
      q_points: userData.q_points,
      q_score: userData.q_score,
      photoURL: photoURL
    };
  });

  console.log("function called....");
  return {
    board,
    last_updated: new Date()
  };
};

export const updateLeaderboard = functions.firestore
  .document("users/{userId}")
  .onUpdate((change: any, context: any) => {
    return admin
      .firestore()
      .collection("users")
      .get()
      .then((users: any) => {
        console.log("Got Users");
        admin
          .firestore()
          .collection("leaderboard")
          .doc("allUsers")
          .update(generateAllUsersBoard(users.docs));
      })
      .catch((err: any) => {
        console.log("Error creating account", err);
      });
  });
