import { app } from '../../main/app';

import { expect } from 'chai';
import request from 'supertest';

// TODO: replace this sample test with proper route tests for your application
/* eslint-disable jest/expect-expect */
describe('Home page', () => {
  describe('on GET', () => {
    test('should return sample home page', async () => {
      await request(app)
        .get('/')
        .expect(res => expect(res.status).to.equal(200));
    });
  });
});

describe('Health check', () => {
  describe('on GET', () => {
    test('should return code 200', async () => {
      await request(app)
        .get('/health')
        .expect(res => expect(res.status).to.equal(200));
    });
  });
});
