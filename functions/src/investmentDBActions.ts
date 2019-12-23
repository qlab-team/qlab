const functions = require("firebase-functions");
const admin = require("firebase-admin");

export const whoInvestedInYou = functions.firestore
  .document("users/{userId}")
  .onUpdate((change: any, context: any) => {
    const beforeDoc = change.before.data();
    const afterDoc = change.after.data();

    const investmentsBefore = beforeDoc.investments;
    const investmentsAfter = afterDoc.investments;

    const investor_user_id = change.before.id;
    const investor_photo = afterDoc.photoURL;

    if (investmentsBefore.length === investmentsAfter.length) {
      //No Changes, Do Nothing
      console.info("No Investments");
      return;
    } else if (investmentsBefore.length > investmentsAfter.length) {
      // Process a Divestment
      console.info("Divestment Detected");

      let divestment_user_id;

      if (investmentsAfter.length === 0) {
        console.info("No More Investments");

        divestment_user_id = investmentsBefore[0].user_id;
      } else if (investmentsAfter.length === 1) {
        console.info("One More Investment Exists");
        divestment_user_id = investmentsBefore.filter((investment: any) => {
          return investment.user_id !== investmentsAfter[0].user_id;
        })[0].user_id;
      }

      console.info(`${investor_user_id} divested from ${divestment_user_id}`);

      return admin
        .firestore()
        .collection("users")
        .doc(divestment_user_id)
        .collection("invested_in_me")
        .doc(investor_user_id)
        .delete()
        .catch((err: any) => {
          console.log("Error creating account", err);
        });
    } else if (investmentsAfter.length > investmentsBefore.length) {
      // Process an Investment
      console.info("Investment Detected");

      let newInvestmentObject;

      if (investmentsBefore.length === 0) {
        newInvestmentObject = investmentsAfter[0];
      } else if (investmentsBefore.length === 1) {
        newInvestmentObject = investmentsAfter.filter((investment: any) => {
          return investment.user_id !== investmentsBefore[0].user_id;
        })[0];
      }

      console.info(
        `${investor_user_id} invested in ${newInvestmentObject.user_id}`
      );

      const invested_in_me_object = {
        timestamp_start: new Date(),
        username: beforeDoc.username,
        user_id: investor_user_id,
        photoURL: investor_photo
      };

      return admin
        .firestore()
        .collection("users")
        .doc(newInvestmentObject.user_id)
        .collection("invested_in_me")
        .doc(investor_user_id)
        .set(invested_in_me_object, { merge: true })
        .catch((err: any) => {
          console.error("Error creating account", err);
        });
    }
  });
