const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../src/server'); // ✅ This now gives you the raw Express app

describe('Auth API', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        firstName: 'Test',
        lastName: 'User',
        email: 'testuser@example.com',
        password: 'secure123',
        dob: '2000-01-01',
        phone: '1234567890'
      });

    expect(res.status).to.equal(201);
    expect(res.body.user).to.have.property('email', 'testuser@example.com');
  });
});
