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
}