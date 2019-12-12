//Firebase Import
const functions = require("firebase-functions");

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");

const calculateNewQScore = (user: any) => {
  const now = new Date();
  const currentQScore = user.q_score;
  const last_quiz_time = user.last_quiz_done.toDate().getTime();

  const timePeriods = {
    day: 86400000,
    hour: 3600000,
    min: 60000,
    sec: 1000
  };

  const differenceTime = now.getTime() - last_quiz_time;
  //15 Mins for Testing
  const quizInLastTimePeriod = differenceTime < 1 * timePeriods.day;

  let quizDoneModifier;

  if (quizInLastTimePeriod) {
    quizDoneModifier = 5;
  } else {
    quizDoneModifier = -5;
  }

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
    return currentQScore + quizDoneModifier + randomAddition;
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
        //Set Up Batch
        // TODO: This only supports max 500 operations, if the users starts to go up, we'll need to reasses
        let batchQScoreWrite = admin.firestore().batch();

        const q_score_map = new Map();

        //For Each User
        users.docs.forEach((user: any) => {
          const userRef = admin
            .firestore()
            .collection("users")
            .doc(user.id);
          const userData = user.data();
          const newQScore = calculateNewQScore(userData);
          const newHistory = calculateNewQScoreHistoryArray(
            userData,
            newQScore
          );
          //Add QScore to Map
          q_score_map.set(user.id, newQScore);
          //Add Update QScore and History to Batch Operation
          batchQScoreWrite.update(userRef, {
            q_score: newQScore,
            q_score_history: newHistory
          });
        });

        //Commit Batch of Q_Score Updates
        batchQScoreWrite.commit().then(() => {
          console.log("Updated Q_Scores for All Users");

          // TODO - 500 limit on this batch again
          let batchInvestmentWrite = admin.firestore().batch();

          users.docs.forEach((user: any) => {
            //For Each User Again
            const userRef = admin
              .firestore()
              .collection("users")
              .doc(user.id);
            const userData = user.data();

            //Set External Investment Total
            let todaysDividends = 0;

            //Build new INvestment Array
            const newInvestments = userData.investments.map(
              (investment: any) => {
                //Where Q Score
                const investmentQScore = q_score_map.get(investment.user_id);
                //Earnings Define the Amount Earned
                const earnings = investmentQScore * 1;
                //Earnings Added To Rolling Total for the Day
                todaysDividends += earnings;
                // Return Investment Object to newInvestment Array with new Points Earned
                return {
                  ...investment,
                  points_earned: investment.points_earned + earnings
                };
              }
            );

            batchInvestmentWrite.update(userRef, {
              q_points: admin.FieldValue.increment(todaysDividends),
              investments: newInvestments,
              earnings_today: todaysDividends
            });
          });

          batchQScoreWrite.commit().then(() => {
            console.log("Updated Investment Earnings");
          });
        });
      })
      .catch((err: any) => {
        console.log("COME ON EILEEN!", err);
      });
  });