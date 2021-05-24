const sequelize = require('./db');
const { DataTypes } = require('sequelize');

module.exports = sequelize.define('Book', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imgurl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    publishDate: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING(11),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT("LONG"),
        allowNull: false,
    }
}, {
    paranoid: true,
});