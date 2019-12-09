const functions = require("firebase-functions");

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");
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

interface DidUserQuizResponse {
  user_id: string;
  username: string;
  last_quiz_done: Date;
  payout: Boolean;
}

export const didUserQuizYesterday = functions
  .region("asia-northeast1")
  .https.onRequest(
    async (
      request: any,
      response: { send: (arg0: { data: DidUserQuizResponse }) => void }
    ) => {
      const user_id = request.query.user_id;
      const snapshot = await admin
        .firestore()
        .collection("users")
        .doc(user_id)
        .get();

      const now = new Date();
      const previousQuiz = snapshot.data.last_quiz_done;

      const differenceTime = now.getTime() - previousQuiz.getTime();
      const quizYesterday = differenceTime / (1000 * 3600) < 24;

      const responseObject = {
        data: {
          user_id: user_id,
          username: snapshot.data.username,
          last_quiz_done: previousQuiz,
          payout: quizYesterday
        }
      };

      response.send(responseObject);
    }
  );
