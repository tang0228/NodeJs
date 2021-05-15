const sequelize = require('./db');
const { DataTypes } = require('sequelize');

// 创建一个模型对象
const Admin = sequelize.define('Admin', {
    loginId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    loginPwd: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    createdAt: false,
    updatedAt: false,
    paranoid: true, // 数据不会真正的删除，增加一个删除时间字段
});

module.exports = Admin;