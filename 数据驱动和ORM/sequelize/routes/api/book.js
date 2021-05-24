const express = require('express');
const router = express.Router();
const bookServ = require('../../services/bookService');
const { asyncHandler } = require('../getSendResult');

router.get('/',
    asyncHandler(async (req, res) => {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        return await bookServ.getBooksByPage(page, limit);
    })
);

router.get('/:id',
    asyncHandler(async (req, res) => {
        return await bookServ.getBookById(req.params.id);
    })
);

router.post('/',
    asyncHandler(async (req, res) => {
        return await bookServ.addBook(req.body);
    })
);

router.delete('/:id',
    asyncHandler(async (req, res) => {
        return await bookServ.deleteBook(req.params.id);
    })
);

router.put('/:id',
    asyncHandler(async (req, res) => {
        return await bookServ.updateBook(req.params.id, req.body);
    })
);

module.exports = router;