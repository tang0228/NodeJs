const Student = require('../models/student');
const Class = require('../models/class');

exports.addStudent = async function (studentObj) {
    const ins = await Student.create(studentObj);
    return ins.toJSON();
};

exports.deleteStudent = async function (studentId) {
    // const ins = await Student.findByPk(studentId);
    // if (ins) {
    //     await ins.destroy();
    // }

    const result = await Student.destroy({
        where: {
            id: studentId
        },
    });
};

exports.udpateStudent = async function (studentId, studentObj) {
    // const ins = await Student.findByPk(studentId);
    // ins.name = studentObj.name;
    // ins.save();

    const result = await Student.update(studentObj, {
        where: {
            id: studentId
        },
    });
};

/**
 * 根据id来获取单个学生信息
 * @param {*} id 
 */
exports.getStuById = async function (id) {
    const result = await Student.findByPk(id);
    if (result) {
        return result.toJSON();
    }
    return null;
};

exports.getStuByPage = async function (page = 1, limit = 10, sex = -1) {
    const where = {};
    if (sex !== -1) {
        where.sex = !!sex;
    }
    const result = await Student.findAll({
        include: [Class],
        where,
        offset: (page - 1) * limit,
        limit
    });
    if (result) {
        return JSON.parse(JSON.stringify(result));
    }
    return null;
}