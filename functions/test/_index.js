const test = require("firebase-functions-test")();
const chai = require("chai");
const assert = chai.assert;

// Need Sinon to stub admin functions when we get to testing that
const sinon = require("sinon");

// Require firebase-admin so we can stub out some of its methods.
const admin = require("firebase-admin");

describe("QLAB Functions Test", () => {
  let qlabFunctions, adminInitStub;

  // eslint-disable-next-line
  before(() => {
    // [START stubAdminInit]
    // If index.js calls admin.initializeApp at the top of the file,
    // we need to stub it out before requiring index.js. This is because the
    // functions will be executed as a part of the require process.
    // Here we stub admin.initializeApp to be a dummy function that doesn't do anything.
    adminInitStub = sinon.stub(admin, "initializeApp");
    // Now we can require index.js and save the exports inside a namespace called myFunctions.
    qlabFunctions = require("../lib/index.js"); // relative path to functions code
    // [END stubAdminInit]
  });

  // eslint-disable-next-line
  after(() => {
    // Restore admin.initializeApp() to its original method.
    adminInitStub.restore();
    // Do other cleanup tasks.
    test.cleanup();
  });

  describe("/helloTokyo", function() {
    it("should return the expected response string", function(done) {
      const req = { query: { text: "input" } };
      const helloTokyoResponse = `
      <h1>QLAB</h1>
      <p>Hello Tokyo 🗼 from all of us at the QLAB Team!</p>
      <p>Derek 🍆</p>
      <p>Eriko ☕</p>
      <p>Fraser 🍻</p>
      <p>Vic 🌮</p>
      `;

      const res = {
        send: body => {
          assert.equal(body, helloTokyoResponse);
          done();
        }
      };

      qlabFunctions.helloTokyo(req, res);
    });
  });

  describe("/didUserQuizYesterday", function() {
    let oldDatabase;
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let hour = date.getHours();
    let user_created = new Date(year - 1, month, day, hour);
    // eslint-disable-next-line
    before(() => {
      // Save the old database method so it can be restored after the test.
      oldDatabase = admin.firestore;
    });

    // eslint-disable-next-line
    after(() => {
      // Restoring admin.database() to the original method.
      admin.firestore = oldDatabase;
    });

    it("true case", function(done) {
      //Fake Date
      let last_quiz_done = new Date(year, month, day, hour - 2);

      //Fake Data
      const collectionParam = "users";
      const docParam = "DEADBEEF";
      const userObject = {
        auth_id: "blahblahblah",
        created_at: user_created,
        last_quiz_done: last_quiz_done,
        q_points: 200,
        q_score: 50,
        quiz_total: 10,
        username: "mr_test"
      };
      //Stubs
      const firestoreStub = sinon.stub();
      const collectionStub = sinon.stub();
      const docStub = sinon.stub();
      const getStub = sinon.stub();

      // The following lines override the behavior of admin.database().ref('/messages')
      // .push({ original: 'input' }) to return a promise that resolves with { ref: 'new_ref' }.
      // This mimics the behavior of a push to the database, which returns an object containing a
      // ref property representing the URL of the newly pushed item.

      Object.defineProperty(admin, "firestore", { get: () => firestoreStub });
      firestoreStub.returns({ collection: collectionStub });
      collectionStub.withArgs(collectionParam).returns({ doc: docStub });
      docStub.withArgs(docParam).returns({ get: getStub });
      getStub.returns(Promise.resolve({ data: userObject }));

      const req = { query: { user_id: "DEADBEEF" } };
      const expectedResponse = {
        data: {
          user_id: "DEADBEEF",
          username: "mr_test",
          last_quiz_done: last_quiz_done,
          payout: true
        }
      };
      const res = {
        send: body => {
          // console.log({ body });
          assert.deepEqual(body, expectedResponse);
          done();
        }
      };

      qlabFunctions.didUserQuizYesterday(req, res);
    });
  });


  describe("/generateLeaderboard"), function() {
    let oldDatabase;

    // eslint-disable-next-line
    before(() => {
      // Save the old database method so it can be restored after the test.
      oldDatabase = admin.firestore;
    });

    // eslint-disable-next-line
    after(() => {
      // Restoring admin.database() to the original method.
      admin.firestore = oldDatabase;
    });

    it("generates a new leaderboard", function(done) {
      //Fake Data
      const collectionParam = "users";
      const users = [
        {
          auth_id: "blahblahblah",
          created_at: new Date,
          last_quiz_done: new Date,
          q_points: 30,
          q_score: 200,
          quiz_total: 3,
          username: "mrs_test"
        },
        {
          auth_id: "wooooooo",
          created_at: new Date,
          last_quiz_done: new Date,
          q_points: 250,
          q_score: 100,
          quiz_total: 2,
          username: "mr_test"
        }
      ]
      //Stubs
      const firestoreStub = sinon.stub();
      const collectionStub = sinon.stub();
      const getStub = sinon.stub();

      // The following lines override the behavior of admin.database().ref('/messages')
      // .push({ original: 'input' }) to return a promise that resolves with { ref: 'new_ref' }.
      // This mimics the behavior of a push to the database, which returns an object containing a
      // ref property representing the URL of the newly pushed item.

      Object.defineProperty(admin, "firestore", { get: () => firestoreStub });
      firestoreStub.returns({ collection: collectionStub });
      collectionStub.withArgs(collectionParam).returns({ get: getStub });
      getStub.returns(Promise.resolve({ data: userObject }));


      const req = { query: { user_id: "DEADBEEF" } };
      const expectedResponse = {
        board: [
          {
            q_points: 250,
            q_score: 100,
            user_id: "DEADBEEF",
            username: "mr_test"
          },
          {
            q_points: 30,
            q_score: 200,
            user_id: "BEEFDEAD",
            username: "mrs_test"
          }
        ]
      };
      const res = {
        send: body => {
          // console.log({ body });
          assert.deepEqual(body, expectedResponse);
          done();
        }
      };

      qlabFunctions.generateLeaderboard(req, res);
    });
    
  }); 
});
