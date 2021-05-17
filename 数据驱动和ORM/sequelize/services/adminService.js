const Admin = require('../models/admin');
exports.addAdmin = async function (adminObj) {
    const ins = await Admin.create(adminObj);
    return ins.toJSON();
};

exports.deleteAdmin = async function (adminId) {
    // 方式1
    // 得到实例
    // const ins = await Admin.findByPk(adminId);
    // console.log(ins);
    // // 删除实例
    // if (ins) {
    //     await ins.destroy();
    // }

    // 方式2
    const result = await Admin.destroy({
        where: {
            id: adminId
        },
    });
    return result;
};


exports.updateAdmin = async function (adminId, adminObj) {
    // 方式1
    // 得到实例
    // const ins = await Admin.findByPk(adminId);
    // ins.loginId = adminObj.loginId;
    // 保存
    // ins.save();

    // 方式2
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
    const result = await Admin.findOne({
        where: {
            loginId,
            loginPwd
        },
    });
    if (result && result.loginId === loginId && result.loginPwd === loginPwd) {
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

