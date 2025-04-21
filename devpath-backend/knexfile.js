require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || 5432,
      user: process.env.DB_USER || 'your_pg_user',
      password: process.env.DB_PASSWORD || 'your_pg_password',
      database: process.env.DB_NAME || 'devpath_db',
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    },
    migrations: {
      directory: './src/db/migrations',
    },
    seeds: {
      directory: './src/db/seeds',
    },
  },
};
