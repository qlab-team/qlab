const test = require("firebase-functions-test")();
const chai = require("chai");
const assert = chai.assert;
const sinon = require("sinon");
const admin = require("firebase-admin");

describe("QLAB Functions Test", () => {
  let qlabFunctions, adminInitStub;

  // eslint-disable-next-line
  before(() => {
    adminInitStub = sinon.stub(admin, "initializeApp");
    qlabFunctions = require("../lib/index.js");
  });

  // eslint-disable-next-line
  after(() => {
    adminInitStub.restore();
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

  describe.skip("/didUserQuizYesterday", function() {
    let oldDatabase;
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let hour = date.getHours();
    let user_created = new Date(year - 1, month, day, hour);
    // eslint-disable-next-line
    before(() => {
      oldDatabase = admin.firestore;
    });

    // eslint-disable-next-line
    after(() => {
      admin.firestore = oldDatabase;
    });

    it("true case", function(done) {
      let last_quiz_done = new Date(year, month, day, hour - 2);
      const collectionParam = "users";
      const docParam = "DEADBEEF";
      const userObject = () => {
        return {
          auth_id: "blahblahblah",
          created_at: user_created,
          last_quiz_done: {
            _seconds: last_quiz_done.getTime() / 1000
          },
          q_points: 200,
          q_score: 50,
          quiz_total: 10,
          username: "mr_test"
        };
      };

      const firestoreStub = sinon.stub();
      const collectionStub = sinon.stub();
      const docStub = sinon.stub();
      const getStub = sinon.stub();

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
          last_quiz_done: { _seconds: last_quiz_done.getTime() / 1000 },
          payout: true
        }
      };
      const res = {
        send: body => {
          assert.deepEqual(body, expectedResponse);
          done();
        }
      };

      qlabFunctions.didUserQuizYesterday(req, res);
    });
  });
});
