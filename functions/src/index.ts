import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  response.send(`
    <h1>QLAB</h1>
    <p>Hello from all of us at the QLAB Team!</p>
    <p>Derek 🍆</p>
    <p>Eriko ☕</p>
    <p>Fraser 🍻</p>
    <p>Vic 🌮</p>
    `);
});
