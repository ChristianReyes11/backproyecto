const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('cbix', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = {
  sequelize
};
