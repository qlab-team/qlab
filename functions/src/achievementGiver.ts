const functions = require("firebase-functions");
const admin = require("firebase-admin");

export const userBadgeChecker = functions.firestore
  .document("users/{userId}")
  .onUpdate((change: any, context: any) => {
    const userData = change.after.data();
    const userId = change.after.id;
    const userBadgeAmount = userData.items.length;
    const userPointAmount = userData.q_points;
    if (userBadgeAmount === 8) {
      giveUserAchievement(userId, "Bought all the badges!");
      // return admin
      //   .firestore()
      //   .collection("users")
      //   .doc(userId)
      //   .update({
      //     achievements: admin.firestore.FieldValue.arrayUnion({
      //       achievement_name: "Bought all the badges!"
      //     })
      //   })
      //   .then(() => {
      //     console.log("achievement given!");
      //   });
    }
    if (userPointAmount >= 1000) {
      giveUserAchievement(userId, "Got 1000 points!");
    }

    if (userPointAmount >= 5000) {
      giveUserAchievement(userId, "Got 5000 points!");
    }
    return "achievement given yo.";
  });

const giveUserAchievement = (userId: string, achievement: string) => {
  console.log(userId);
  admin
    .firestore()
    .collection("users")
    .doc(userId)
    .update({
      achievements: admin.firestore.FieldValue.arrayUnion({
        achievement_name: achievement
      })
    });
  console.log("achievement set");
};

export const checkTopAndBottomOfLeaderBoard = functions.firestore
  .document("users/{userId}")
  .onUpdate((change: any, context: any) => {
    return admin
      .firestore()
      .collection("users")
      .get()
      .then((users: any) => {
        console.log(users.docs);
        const topAndBottomUsers = getTopAndBottomUser(users.docs);
        giveUserAchievement(
          topAndBottomUsers[1].id,
          "Reached the top of the leaderboard!"
        );

        giveUserAchievement(
          topAndBottomUsers[0].id,
          "Reached the... bottom of the leaderboard!"
        );
      })
      .catch((err: any) => {
        console.log("Error creating account", err);
      });
  });

const getTopAndBottomUser = (users: any) => {
  const lowestScoreUser = { id: "", score: 500 };
  const highestScoreUser = { id: "", score: 0 };

  users.map((user: any) => {
    const userData = user.data();
    //if user has highest score grab and store their id
    if (userData.q_points > highestScoreUser.score) {
      highestScoreUser.id = user.id;
      highestScoreUser.score = userData.q_points;
    }

    //if user has lowest score grab and store their id
    if (userData.q_points <= lowestScoreUser.score) {
      lowestScoreUser.id = user.id;
      lowestScoreUser.score = userData.q_points;
    }
  });
  console.log(lowestScoreUser, highestScoreUser);
  return [lowestScoreUser, highestScoreUser];
};

//call function to give the user an achievement
// console.log("highest ", highestScoreUser.id);
// console.log("highest ", lowestScoreUser.id);

// giveUserAchievement(
//   highestScoreUser.id,
//   "Reached the top of the leaderboard!"
// );

// giveUserAchievement(
//   lowestScoreUser.id,
//   "Reached the... bottom of the leaderboard!"
// );
