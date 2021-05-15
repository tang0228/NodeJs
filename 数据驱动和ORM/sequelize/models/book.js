const sequelize = require('./db');
const { DataTypes, DATE } = require('sequelize');

module.exports = sequelize.define('Book', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imgurl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    publishDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING(11),
        allowNull: false,
    }
}, {
    paranoid: true,
});