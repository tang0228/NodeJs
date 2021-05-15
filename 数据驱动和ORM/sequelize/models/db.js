const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('myschooldb', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;