const functions = require("firebase-functions");

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");

const generateAllUsersBoard = (users: any) => {
  const highestScoreUser = { id: "", score: 0 };

  const board = users.map((user: any) => {
    const userData = user.data();
    // If there is no photoURL, it sets to random avatar URL
    let photoURL = "https://joeschmoe.io/api/v1/random";
    if (userData.photoURL) photoURL = userData.photoURL;

    //if user has highest score grab and store their id
    if (userData.q_points > highestScoreUser.score) {
      highestScoreUser.id = user.id;
      highestScoreUser.score = userData.q_points;
    }

    return {
      username: userData.username,
      user_id: user.id,
      q_points: userData.q_points,
      q_score: userData.q_score,
      photoURL: photoURL
    };
  });

  //call function to give the user an achievement
  giveHighestScoreUserAchievement(highestScoreUser.id);
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

const giveHighestScoreUserAchievement = (userId: string) => {
  console.log("beginning of function");
  admin
    .firestore()
    .collection("users")
    .doc(userId)
    .update({
      achievements: admin.firestore.FieldValue.arrayUnion({
        achievement_name: "Reached the top of the leaderboard!"
      })
    });
  console.log("achievement set");
};
