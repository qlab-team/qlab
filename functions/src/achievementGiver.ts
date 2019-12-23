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
    }
    if (userPointAmount >= 1000) {
      giveUserAchievement(userId, "Got 1000 points!");
    }

    if (userPointAmount >= 5000) {
      giveUserAchievement(userId, "Got 5000 points!");
    }
    return "Achievements set.";
  });

const giveUserAchievement = (userId: string, achievement: string) => {
  admin
    .firestore()
    .collection("users")
    .doc(userId)
    .update({
      achievements: admin.firestore.FieldValue.arrayUnion({
        achievement_name: achievement
      })
    })
    .catch((err: any) => {
      console.error("Error Giving Acheivement", err);
    });
  console.info("Achievement set");
};

export const checkTopAndBottomOfLeaderBoard = functions.firestore
  .document("users/{userId}")
  .onUpdate((change: any, context: any) => {
    return admin
      .firestore()
      .collection("users")
      .get()
      .then((users: any) => {
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
        console.error("Error Giving Acheivements", err);
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
