const knex = require('knex');
const config = require('../../knexfile');

const db = knex(config.development); // or switch by NODE_ENV

module.exports = db;
