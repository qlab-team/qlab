const functions = require("firebase-functions");
const admin = require("firebase-admin");

const generateAllUsersBoard = (users: any) => {
  const board = users.map((user: any) => {
    const userData = user.data();
    // If there is no photoURL, set the URL to a random avatar from JoeSchmoe.io
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
        console.info("Got Users");
        admin
          .firestore()
          .collection("leaderboard")
          .doc("allUsers")
          .update(generateAllUsersBoard(users.docs));
      })
      .catch((err: any) => {
        console.error("Error updating leaderboard", err);
      });
  });
