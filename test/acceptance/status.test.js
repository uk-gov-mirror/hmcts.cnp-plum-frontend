require('should');
require('should-http');

const request = require('supertest');
const { app } = require('../../server');

/*describe('Test readiness', () => {
  it('respond with json', function (done) {
    request(server)
      .get('/health')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        res.should.have.status(200);
        //res.body.should.have.property('api');
        server.close();
        done();
      });
  });
});*/

describe('Test liveness', () => {
    it('respond with json', function (done) {
        request(app)
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});
