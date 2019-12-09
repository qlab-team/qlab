const test = require("firebase-functions-test")();
const chai = require("chai");
const assert = chai.assert;

// Need Sinon to stub admin functions when we get to testing that
//const sinon = require("sinon");

const qlabFunctions = require("../lib/index.js"); // relative path to functions code

describe("QLAB Functions Test", function() {
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

test.cleanup();
