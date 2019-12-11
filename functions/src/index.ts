const functions = require("firebase-functions");

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");

// CORS Express middleware to enable CORS Requests.
const cors = require("cors")({
  origin: true
});

admin.initializeApp();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
// For other deployment options https://firebase.google.com/docs/functions/manage-functions

export const helloTokyo = functions
  .region("asia-northeast1")
  .https.onRequest(
    (request: any, response: { send: (arg0: string) => void }) => {
      response.send(`
      <h1>QLAB</h1>
      <p>Hello Tokyo 🗼 from all of us at the QLAB Team!</p>
      <p>Derek 🍆</p>
      <p>Eriko ☕</p>
      <p>Fraser 🍻</p>
      <p>Vic 🌮</p>
      `);
    }
  );

export const requester = functions
  .region("asia-northeast1")
  .https.onRequest((request: any, response: any) => {
    response.send(JSON.stringify(request));
  });

// interface DidUserQuizResponse {
//   user_id: string;
//   username: string;
//   last_quiz_done: Date;
//   payout: Boolean;
// }

// { send: (arg0: { data: DidUserQuizResponse }) => void }

export const didUserQuizYesterday = functions
  .region("asia-northeast1")
  .https.onRequest((request: any, response: any) => {
    return cors(request, response, async () => {
      const user_id = request.query.user_id;
      let snapshot;
      try {
        snapshot = await admin
          .firestore()
          .collection("users")
          .doc(user_id)
          .get();
      } catch (error) {
        console.log(error);
      }

      const now = new Date();
      const data = snapshot.data();
      const previousQuiz = data.last_quiz_done;

      const differenceTime = now.getTime() / 1000 - previousQuiz._seconds;
      const quizYesterday = differenceTime / 3600 < 24;

      const responseObject = {
        data: {
          user_id: user_id,
          username: data.username,
          last_quiz_done: previousQuiz,
          payout: quizYesterday
        }
      };

      response.send(responseObject);
    });
  });

export const generateNewUser = functions.auth.user().onCreate((auth: any) => {
  return admin
    .firestore()
    .collection("users")
    .add(generateUser(auth))
    .then(() => {
      console.log("Account Created");
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
    last_quiz_done: new Date(),
    q_score_history: [
      { date: 1575817200, q_score: 90 },
      { date: 1575730800, q_score: 50 },
      { date: 1575644400, q_score: 80 },
      { date: 1575558000, q_score: 60 },
      { date: 1575471600, q_score: 45 },
      { date: 1575298800, q_score: 35 }
    ]
  };
};


const generateAllUsersBoard = (users: any) => {
  const board = users.map((user: any) => {
    const userdata = user.data()
    return {
      username: userdata.username,
      user_id: user.id,
      q_points: userdata.q_points,
      q_score: userdata.q_score
    }
  })

  return {
    board,
    last_updated: new Date()
  }
}

export const updateLeaderboard = functions.firestore.document('users/{userId}').onUpdate((change: any, context: any) => {
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
        .update(generateAllUsersBoard(users.docs))
    })
    .catch((err: any) => {
      console.log("Error creating account", err);
    });
});