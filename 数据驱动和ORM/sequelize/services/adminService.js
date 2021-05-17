const Admin = require('../models/admin');
const md5 = require('md5');

exports.addAdmin = async function (adminObj) {
    adminObj.loginPwd = md5(adminObj.loginPwd);
    const ins = await Admin.create(adminObj);
    return ins.toJSON();
};

exports.deleteAdmin = async function (adminId) {
    const result = await Admin.destroy({
        where: {
            id: adminId
        },
    });
    return result;
};

exports.updateAdmin = async function (adminId, adminObj) {
    if (adminObj.loginPwd) {
        adminObj.loginPwd = md5(adminObj.loginPwd);
    }
    const result = await Admin.update(adminObj, {
        where: {
            id: adminId
        },
    });
    return result;
};

/**
 * 登录
 * @param {} loginId 
 * @param {*} loginPwd 
 * @returns 
 */
exports.login = async function (loginId, loginPwd) {
    loginPwd = md5(loginPwd);
    const result = await Admin.findOne({
        where: {
            loginId,
            loginPwd
        },
    });
    if (result && result.loginId === loginId) {
        return result.toJSON();
    }
    return null;
};

/**
 * 根据id获取管理员信息
 * @param {*} id 
 * @returns 
 */
exports.getAdminById = async function (id) {
    const result = await Admin.findByPk(id);
    if (result) {
        return result.toJSON();
    }
    return null;
};

/**
 * 获取所有管理员信息
 * @returns 
 */
exports.getAllAdmin = async function () {
    const count = await Admin.count(); // 管理员的数量
    const datas = await Admin.findAll();
    if (datas) {
        return {
            count,
            datas: JSON.parse(JSON.stringify(datas)) // 所有管理员
        }
    }
    return null;
}

