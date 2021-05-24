const Book = require('../models/book');
// 统计图书
exports.addBook = async function (bookObj) {
    const ins = await Book.create(bookObj);
    return ins.toJSON();
};

// 删除图书
exports.deleteBook = async function (bookId) {
    const result = await Book.destroy({
        where: {
            id: bookId
        },
    });
    return result;
};

// 修改图书
exports.updateBook = async function (bookId, bookObj) {
    const result = await Book.update(bookObj, {
        where: {
            id: bookId
        }
    });
    return result;
};

// 根据id得到图书信息
exports.getBookById = async function (id) {
    const result = await Book.findByPk(id);
    if (result) {
        return result.toJSON();
    }
    return null;
};

// 分页获取图书
exports.getBooksByPage = async function (page = 1, limit = 10) {
    const result = await Book.findAll({
        offset: (page - 1) * limit,
        limit
    });
    if (result) {
        return {
            count: await Book.count(),
            datas: JSON.parse(JSON.stringify(result)),
        }
    }
    return null;
};