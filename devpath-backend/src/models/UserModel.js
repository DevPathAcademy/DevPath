const db = require('../db/knex');

const createUser = async (user) => {
  return await db('users')
    .insert({
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      phone: user.phone || null,
      dob: user.dob,
      password: user.password,
    })
    .returning(['id', 'email', 'first_name', 'last_name']);
};

const findByEmail = async (email) => {
  return await db('users').where({ email }).first();
};

module.exports = {
  createUser,
  findByEmail,
};
