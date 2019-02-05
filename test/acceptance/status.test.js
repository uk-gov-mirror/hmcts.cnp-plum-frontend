require("should");
require("should-http");
var app, server, request;

describe("GET /status", () => {
  beforeEach(done => {
    request = require("supertest");
    app = require("../../server").app;
    server = require("../../server").server;
    done();
  });

  afterEach(() => server.close());

  it("respond with json", function(done) {
    request(app)
      .get("/health")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("api");
        done();
      });
  });
});
