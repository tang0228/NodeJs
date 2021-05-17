const Student = require('../models/student');
const Class = require('../models/class');
const validate = require('validate.js');
const moment = require('moment');
const { pick } = require('../util/propertyHelper');

exports.addStudent = async function (studentObj) {
    studentObj = pick(studentObj, 'name', 'birthday', 'sex', 'mobile', 'ClassId');
    validate.validators.classExits = async function (value) {
        const c = await Class.findByPk(value);
        if (c) {
            return;
        }
        return "is not exist"
    };
    const rule = {
        name: {
            presence: {
                allowEmpty: false,
            },
            type: "string",
            length: {
                minimum: 1,
                maximum: 10
            }
        },
        birthday: {
            presence: {
                allowEmpty: false,
            },
            datetime: {
                dateOnly: true,
                earliest: +moment.utc().subtract(100, 'y'),
                latest: +moment.utc().subtract(5, 'y'),
            }
        },
        sex: {
            presence: true,
            type: 'boolean',
        },
        mobile: {
            presence: {
                allowEmpty: false,
            },
            format: /1\d{10}/,
        },
        ClassId: {
            presence: true,
            numericality: {
                onlyInteger: true,
                strict: false,
            },
            classExits: true,
        }
    }
    await validate.async(studentObj, rule);
    const ins = await Student.create(studentObj);
    return ins.toJSON();
};

exports.deleteStudent = async function (studentId) {
    const result = await Student.destroy({
        where: {
            id: studentId
        },
    });
    return result;
};

exports.udpateStudent = async function (studentId, studentObj) {
    const result = await Student.update(studentObj, {
        where: {
            id: studentId
        },
    });
    return result;
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