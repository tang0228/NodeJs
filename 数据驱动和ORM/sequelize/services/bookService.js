const book = require('../models/book');
const Book = require('../models/book');

exports.addBook = async function (bookObj) {
    const ins = await Book.create(bookObj);
    return ins.toJSON();
}

exports.deleteBook = async function (bookId) {
    // const ins = await Book.findByPk(bookId);
    // if (ins) {
    //     await ins.destroy();
    // }

    const result = await Book.destroy({
        where: {
            id: bookId
        },
    });
}

exports.updateBook = async function (bookId, bookObj) {
    // const ins = await Book.findByPk(bookId);
    // ins.name = bookObj.name;
    // ins.save();

    const result = await Book.update(bookObj, {
        where: {
            id: bookId
        }
    });
    return result;
}