const functions = require("firebase-functions");
const admin = require("firebase-admin");

export const userBadgeChecker = functions.firestore
  .document("users/{userId}")
  .onUpdate((change: any, context: any) => {
    const userData = change.after.data();
    const userId = change.after.id;
    const userBadgeAmount = userData.items.length;

    if (userBadgeAmount === 8) {
      return admin
        .firestore()
        .collection("users")
        .doc(userId)
        .update({
          achievements: admin.firestore.FieldValue.arrayUnion({
            achievement_name: "Bought all the badges!"
          })
        })
        .then(() => {
          console.log("achievement given!");
        });
    } else {
      return "not enough badges buddy";
    }
  });

const checkUserPoints = functions.firestore
  .document("users/{userId}")
  .onUpdate((change: any, context: any) => {
    return admin
      .firestore()
      .collection("users")
      .get()
      .then((users: any) => {
        admin
          .firestore()
          .collection("leaderboard")
          .doc("allUsers")
          .update();
      })
      .catch((err: any) => {
        console.log("Error creating account", err);
      });
  });

// const UpdateAchievements = (users: any) => {}

//if user has highest score grab and store their id
// if (userData.q_points > highestScoreUser.score) {
//   highestScoreUser.id = user.id;
//   highestScoreUser.score = userData.q_points;
// }

//if user has lowest score grab and store their id

// if (userData.q_points <= lowestScoreUser.score) {
//   lowestScoreUser.id = user.id;
//   lowestScoreUser.score = userData.q_points;
// }

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

//   const giveUserAchievement = (userId: string, achievement: string) => {
//     admin
//       .firestore()
//       .collection("users")
//       .doc(userId)
//       .update({
//         achievements: admin.firestore.FieldValue.arrayUnion({
//           achievement_name: achievement
//         })
//       });
//     console.log("achievement set");
//   };

// .document("users/")

// export const updateLeaderboard = functions.firestore
//   .document("users/{userId}")
//   .onUpdate((change: any, context: any) => {
//     return admin
//       .firestore()
//       .collection("users")
//       .get()
//       .then((users: any) => {
//         console.log("Got Users");
//         admin
//           .firestore()
//           .collection("leaderboard")
//           .doc("allUsers")
//           .update(generateAllUsersBoard(users.docs));
//       })
//       .catch((err: any) => {
//         console.log("Error creating account", err);
//       });
//   });
