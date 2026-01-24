const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // File where data will be stored
  logging: false,
});

module.exports = sequelize;
