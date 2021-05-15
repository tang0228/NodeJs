const Class = require('../models/class');

exports.addClass = async function (classObj) {
    const ins = await Class.create(classObj);
    return ins.toJSON();
};

exports.deleteClass = async function (classId) {
    // const ins = await Class.findByPk(classId);
    // if (ins) {
    //     await ins.destroy();
    // }

    const result = await Class.destroy({
        where: {
            id: classId
        },
    });
    return result;
};

exports.updateClass = async function (classId, classObj) {
    // const ins = await Class.findByPk(classId);
    // ins.name = classObj.name;
    // ins.save();

    const result = await Class.update(classObj, {
        where: {
            id: classId
        },
    });
}
