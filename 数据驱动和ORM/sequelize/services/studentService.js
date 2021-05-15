const Student = require('../models/student');

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
}

exports.udpateStudent = async function (studentId, studentObj) {
    // const ins = await Student.findByPk(studentId);
    // ins.name = studentObj.name;
    // ins.save();

    const result = await Student.update(studentObj, {
        where: {
            id: studentId
        },
    });
}