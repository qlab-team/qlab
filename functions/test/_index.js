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
});
