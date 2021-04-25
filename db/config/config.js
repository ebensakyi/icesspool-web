require('dotenv').config();

module.exports = {
  development: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.PORT,
    dialect: 'mysql'
  },
  test: {
    username: 'root',
    password: 'kofi@2318',
    database: 'db_icesspool',
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql'
  },
  production: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.PORT,
    dialect: 'mysql'
  }
}
