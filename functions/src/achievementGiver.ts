const functions = require("firebase-functions");
const admin = require("firebase-admin");

export const userStatsChecker = functions.firestore
  .document("users/{userId}")
  .onUpdate((change: any, context: any) => {
    const userData = change.after.data().item.length;
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
      return "not enough badges";
    }
  });

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
