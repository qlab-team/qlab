//Firebase Import
const functions = require("firebase-functions");

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");

const calculateNewQScore = (user: any) => {
  const currentQScore = user.q_score;
  const quizzes_done_today = user.quizzes_done_today;

  //This calc gives a Max Loss of 10 and Max Gain of 10
  const quizDoneModifier = Math.round(
    Math.pow(0.8, quizzes_done_today) * -20 + 10
  );

  //Examples:
  // 0 => -10
  // 1 => -6
  // 3 => 0
  // 6 => 5
  // 10 => 8
  // 100 => 10

  //Add Random Integer from -2 to 2
  const randomAddition = Math.floor(Math.random() * 5) - 2;

  //QScore Calculation
  const newQScore = currentQScore + quizDoneModifier + randomAddition;

  //Limit Going Below 0 or above 100
  if (newQScore >= 100) {
    return 100;
  } else if (newQScore <= 0) {
    return 0;
  } else {
    return newQScore;
  }
};

const calculateNewQScoreHistoryArray = (user: any, newQScore: number) => {
  const now = new Date();
  const maxLength = 10; //10 Days of Daily Updates
  const oldHistoryArray = user.q_score_history;

  const newHistoryObject = {
    date: now,
    q_score: newQScore
  };

  const newHistoryArray = [newHistoryObject, ...oldHistoryArray];

  if (newHistoryArray.length > maxLength) {
    newHistoryArray.pop();
  }

  return newHistoryArray;
};

const q_score_updates = (users: any) => {
  //Set Up Batch
  // TODO: This only supports max 500 operations, if the users starts to go up, we'll need to reasses
  const batchQScoreWrite = admin.firestore().batch();

  const q_score_map = new Map();

  //For Each User
  users.docs.forEach((user: any) => {
    const userRef = admin
      .firestore()
      .collection("users")
      .doc(user.id);
    const userData = user.data();
    const newQScore = calculateNewQScore(userData);
    const newHistory = calculateNewQScoreHistoryArray(userData, newQScore);
    //Add QScore to Map
    q_score_map.set(user.id, newQScore);
    //Add Update QScore and History to Batch Operation
    batchQScoreWrite.update(userRef, {
      q_score: newQScore,
      q_score_history: newHistory,
      quizzes_done_today: 0
    });
  });

  //Commit Batch of Q_Score Updates
  batchQScoreWrite.commit().then(() => {
    console.log("Updated Q_Scores for All Users");
  });

  return q_score_map;
};

const investmentUpdates = (users: any, q_score_map: any) => {
  console.log("Starting Investment Updates");
  // TODO - 500 limit on this batch again
  const batchInvestmentWrite = admin.firestore().batch();

  const historyChanges: any[] = [];

  users.docs.forEach((user: any) => {
    //For Each User Again

    //User Table Reference
    const userRef = admin
      .firestore()
      .collection("users")
      .doc(user.id);
    const userData = user.data();

    //Set External Investment Total
    let todaysDividends = 0;

    let newInvestments: any;

    const user_history_earnings_changes = new Map();

    if (userData.investments.length > 0) {
      //Build new INvestment Array
      newInvestments = userData.investments.map((investment: any) => {
        //Where Q Score
        const investmentQScore = q_score_map.get(investment.user_id);
        //Earnings Define the Amount Earned
        const earnings = investmentQScore * 1;
        const newTotalEarnings = investment.points_earned + earnings;

        //Earnings Added To Rolling Total for the Day
        todaysDividends += earnings;

        user_history_earnings_changes.set(investment.user_id, newTotalEarnings);
        // Return Investment Object to newInvestment Array with new Points Earned
        return {
          ...investment,
          points_earned: newTotalEarnings,
          q_score: investmentQScore
        };
      });
    } else {
      newInvestments = [];
    }

    historyChanges.push(
      updateHistoryTable(
        user.id,
        user_history_earnings_changes,
        batchInvestmentWrite
      )
    );

    batchInvestmentWrite.update(userRef, {
      q_points: userData.q_points + todaysDividends,
      investments: newInvestments,
      earnings_today: todaysDividends
    });
  });

  console.log("About to commit Earnings");
  // console.log(historyChanges);
  return Promise.all(historyChanges)
    .then(() => {
      batchInvestmentWrite.commit();
    })
    .catch((err: any) => {
      console.log("Error Committing Investment Batch", err);
    });
};

const updateHistoryTable = (
  investor_id: String,
  changes_map: any,
  batch: any
) => {
  //User History Table Reference
  const userHistoryRef = admin
    .firestore()
    .collection("transaction_history")
    .doc(investor_id);

  return userHistoryRef
    .get()
    .then((doc: any) => {
      const data = doc.data();

      return data.investment_history.map((history_item: any) => {
        //Return Inactive Objects
        if (!history_item.active) {
          return history_item;
        }

        if (changes_map.has(history_item.user_id)) {
          return {
            ...history_item,
            points_earned: changes_map.get(history_item.user_id)
          };
        }
      });
    })
    .then((new_investment_history: any) => {
      batch.update(userHistoryRef, {
        investment_history: new_investment_history,
        last_updated: new Date()
      });
    })
    .catch((err: any) => {
      console.log("Error Updating History Table", err);
    });
};

export const dexysMidnightRunner = functions.pubsub
  .schedule("every day 00:00") //Every Day for Publishing
  // .schedule('every 1 hours') //Every Hour For Development
  //.schedule('every 15 mins') //Every 15 Mins For Testing
  .timeZone("Asia/Tokyo")
  .onRun((context: any) => {
    return admin
      .firestore()
      .collection("users")
      .get()
      .then((users: any) => {
        console.log("Got All Users");
        const q_score_map = q_score_updates(users);
        return { q_score_map, users };
      })
      .then((result: any) => {
        console.log("Updated QScores");
        return investmentUpdates(result.users, result.q_score_map);
      })
      .then(() => {
        console.log("Updated Investments");
      })
      .catch((err: any) => {
        console.log("COME ON, EILEEN!", err);
      });
  });
