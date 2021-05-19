const Class = require('../models/class');

exports.addClass = async function (classObj) {
    const ins = await Class.create(classObj);
    return ins.toJSON();
};

exports.deleteClass = async function (classId) {
    const result = await Class.destroy({
        where: {
            id: classId
        },
    });
    return result;
};

exports.updateClass = async function (classId, classObj) {
    const result = await Class.update(classObj, {
        where: {
            id: classId
        },
    });
    return result;
};

/**
 * 根据id获取班级信息
 * @param {*} id 
 */
exports.getClassById = async function (id) {
    const result = await Class.findByPk(id);
    if (result) {
        return result.toJSON();
    }
    return null;
};

/**
 * 获取所有班级信息
 * @returns 
 */
exports.getAllClass = async function () {
    const { rows, count } = await Class.findAndCountAll();
    return {
        count,
        datas: JSON.parse(JSON.stringify(rows)),
    }
};
