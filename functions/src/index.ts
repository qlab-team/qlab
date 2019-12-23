//Import Functions

import { dexysMidnightRunner } from "./dexysMidnightRunner";
import { generateNewUser } from "./accountCreationActions";
import { updateLeaderboard } from "./leaderboardDBActions";
import { whoInvestedInYou } from "./investmentDBActions";
import {
  userBadgeChecker,
  checkTopAndBottomOfLeaderBoard
} from "./achievementGiver";

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

// Pass Along Functions
// For Firebase, All Functions in Use Must be Exported from Index.ts
export {
  dexysMidnightRunner,
  generateNewUser,
  updateLeaderboard,
  whoInvestedInYou,
  userBadgeChecker,
  checkTopAndBottomOfLeaderBoard
};

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
