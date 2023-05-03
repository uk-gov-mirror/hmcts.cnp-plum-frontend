import { app } from '../../main/app';

import { expect } from 'chai';
import request from 'supertest';

/* eslint-disable jest/expect-expect */
describe('Example test to satisfy jest (to be removed from your app)', () => {
  test('to be removed from your app', async () => {
    // eslint-disable-line @typescript-eslint/no-empty-function
  });
});

describe('Home', () => {
  describe('on GET', () => {
    test('should return code 200', async () => {
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

describe('Non-existent page', () => {
  describe('on GET', () => {
    test('should return code 200', async () => {
      await request(app)
        .get('/doesnoteist')
        .expect(res => expect(res.status).to.equal(404));
    });
  });
});

