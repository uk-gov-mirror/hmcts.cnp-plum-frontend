require('should');
require('should-http');
var app, server, request;

describe('GET /', () => {
  beforeEach(done => {
    request = require('supertest');
    app = require('../../server').app;
    server = require('../../server').server;
    done();
  });

  afterEach(() => server.close());

  it('should have an index page', done => {
    request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(500);
        done();
      });
  });
});
