const functions = require("firebase-functions");

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");

export const generateNewUser = functions.auth.user().onCreate((auth: any) => {
  return admin
    .firestore()
    .collection("users")
    .add(generateUser(auth))
    .then((document: any) => {
      console.log("Account Created");
      createNewTransactionHistory(document.id, auth.uid);
      return;
    })
    .catch((err: any) => {
      console.log("Error creating account", err);
    });
});

const generateUser = (authObject: any) => {
  return {
    auth_id: authObject.uid,
    username: authObject.email.split("@")[0],
    q_points: 0,
    q_score: 0,
    quiz_total: 0,
    created_at: new Date(),
    investments: [],
    items: [],
    last_quiz_done: new Date(),
    quizzes_done_today: 0,
    q_score_history: []
  };
};

const createNewTransactionHistory = (user_id: string, auth_id: string) => {
  return admin
    .firestore()
    .collection("transaction_history")
    .doc(user_id)
    .set(generateUserHistory(auth_id))
    .then(() => {
      console.log("Transaction History Created");
      return;
    })
    .catch((err: any) => {
      console.log("Error creating Transaction History", err);
    });
};

const generateUserHistory = (auth_id: string) => {
  return {
    auth_id,
    investment_history: [],
    purchase_history: [],
    quiz_history: [],
    last_updated: new Date()
  };
};
