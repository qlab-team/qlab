//Firebase Import
const functions = require("firebase-functions");

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");

admin.initializeApp();



const calculateNewQScore = (user: any) => {
    const now = new Date
    const currentQScore = user.q_score;
    const last_quiz_time = user.last_quiz_done.toDate().getTime();

    const timePeriods = {
        day: 86400000,
        hour: 3600000,
        min: 60000,
        sec: 1000
    }

    const differenceTime = now.getTime() - last_quiz_time;
    //15 Mins for Testing
    const quizInLastTimePeriod = differenceTime < (15 * timePeriods.min);

    let quizDoneModifier

    if (quizInLastTimePeriod) {
        quizDoneModifier = 1
    } else {
        quizDoneModifier = -1
    }

    //Add Random Integer from -1 to 1
    const randomAddition = Math.floor(Math.random() * 3) - 1;

    //QScore Calculation
    const newQScore = currentQScore + quizDoneModifier + randomAddition

    //Limit Going Below 0 or above 100
    if (newQScore >= 100) {
        return 100
    } else if (newQScore <= 0) {
        return 0
    } else {
        return currentQScore + quizDoneModifier + randomAddition
    }

}


const calculateNewQScoreHistoryArray = (user: any, newQScore: number) => {
    const now = new Date
    const maxLength = 10 //10 Days of Daily Updates
    const oldHistoryArray = user.q_score_history;

    const newHistoryObject = {
        date: now,
        q_score: newQScore
    }

    const newHistoryArray = [newHistoryObject, ...oldHistoryArray]

    if (newHistoryArray.length > maxLength) {
        newHistoryArray.pop()
    }

    return newHistoryArray
}

export const dexysMidnightRunner = functions
    .pubsub
    // .schedule('every day 00:00') //Every Day for Publishing
    // .schedule('every 1 hours') //Every Hour For Development
    .schedule('every 15 mins') //Every 15 Mins For Testing
    .timeZone('Asia/Tokyo')
    .onRun((context: any) => {
        return admin
            .firestore()
            .collection("users")
            .get()
            .then((users: any) => {
                console.log("Got All Users");
                //For Each User
                users.docs.forEach((user: any) => {
                    const userData = user.data()
                    const newQScore = calculateNewQScore(userData)
                    const newHistory = calculateNewQScoreHistoryArray(userData, newQScore);
                    //Update QScore and History
                    admin
                        .firestore()
                        .collection("users")
                        .doc(user.id)
                        .update({
                            q_score: newQScore,
                            q_score_history: newHistory
                        })

                });
                //Update History
                console.log("Updated Q_Scores for All Users");

            })
            .catch((err: any) => {
                console.log("Error creating account", err);
            });
    });
