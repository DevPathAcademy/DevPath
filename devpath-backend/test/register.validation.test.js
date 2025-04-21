const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../src/server');

describe('Register Validation Middleware', () => {
  const validUser = {
    firstName: 'Test',
    lastName: 'User',
    email: 'valid@example.com',
    password: 'Test!234',
    dob: '04-04-1987',
    phone: '1234567890',
  };

  it('should reject invalid email format', async () => {
    const res = await request(app).post('/api/auth/register').send({
      ...validUser,
      email: 'not-an-email',
    });

    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('Invalid email format');
  });

  it('should reject password missing uppercase, number, or special character', async () => {
    const res = await request(app).post('/api/auth/register').send({
      ...validUser,
      password: 'weakpass', // lowercase only
    });
  
    expect(res.status).to.equal(400);
    expect(res.body.message).to.include('Password must be at least 8 characters long');
  });
  

  it('should reject if user is younger than 16', async () => {
    const res = await request(app).post('/api/auth/register').send({
      ...validUser,
      dob: '04-28-2016',
    });
  
    expect(res.status).to.equal(400);
    expect(res.body.message).to.include('You must be at least 16 years old');
  });

  it('should reject DOB without dashes', async () => {
    const res = await request(app).post('/api/auth/register').send({
      ...validUser,
      dob: '01012000', // MMDDYYYY
    });
  
    expect(res.status).to.equal(400);
    expect(res.body.message).to.include('Date of birth must be in MM-DD-YYYY format');
  });

  it('should reject phone number that does not contain exactly 10 digits', async () => {
    const res = await request(app).post('/api/auth/register').send({
      ...validUser,
      phone: '12345678', // 8 digits
    });
  
    expect(res.status).to.equal(400);
    expect(res.body.message).to.include('Phone number must contain exactly 10 digits');
  });

  it('should reject phone number with too many digits', async () => {
    const res = await request(app).post('/api/auth/register').send({
      ...validUser,
      phone: '1234567890123', // 13 digits
    });
  
    expect(res.status).to.equal(400);
    expect(res.body.message).to.include('Phone number must contain exactly 10 digits');
  });
  
  it('should reject phone number with letters in it', async () => {
    const res = await request(app).post('/api/auth/register').send({
      ...validUser,
      phone: '123abc7890', // contains letters
    });
  
    expect(res.status).to.equal(400);
    expect(res.body.message).to.include('Phone number must contain exactly 10 digits');
  });
  

it('should accept phone number with formatting (123) 456-7890', async () => {
  const res = await request(app).post('/api/auth/register').send({
    ...validUser,
    email: `formatted${Date.now()}@example.com`,
    phone: '(123) 456-7890',
  });

  expect(res.status).to.equal(201);
  expect(res.body.user).to.have.property('email');
});


  it('should pass when all fields are valid', async () => {
    const res = await request(app).post('/api/auth/register').send({
      ...validUser,
      email: `user${Date.now()}@example.com`, // Ensure uniqueness
    });

    expect(res.status).to.equal(201);
    expect(res.body.user).to.have.property('email');
  });
});
