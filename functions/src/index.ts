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
