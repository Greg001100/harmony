require('dotenv').config();

module.exports = {
  "development": {
    "username": "harmony_app",
    "password": process.env.DB_PASSWORD,
    "database": "harmony_development",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "seederStorage": "sequelize"
  },
  "test": {
    "username": "harmony_app",
    "password": process.env.DB_PASSWORD,
    "database": "harmony_test",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "seederStorage": "sequelize"
  },
  "production": {
    "username": "harmony_app",
    "password": process.env.DB_PASSWORD,
    "database": "harmony_production",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "seederStorage": "sequelize"
  }
}
