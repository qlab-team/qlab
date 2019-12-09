import * as functions from "firebase-functions";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
// For other deployment options

export const helloTokyo = functions
  .region("asia-northeast1")
  .https.onRequest((request, response) => {
    response.send(`
      <h1>QLAB</h1>
      <p>Hello Tokyo 🗼 from all of us at the QLAB Team!</p>
      <p>Derek 🍆</p>
      <p>Eriko ☕</p>
      <p>Fraser 🍻</p>
      <p>Vic 🌮</p>
      `);
  });
