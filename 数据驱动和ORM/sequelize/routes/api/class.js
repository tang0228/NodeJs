const express = require('express');
const classServ = require('../../services/classService');
const router = express.Router();
const { asyncHandler } = require('../getSendResult');

router.post('/', asyncHandler(async (req, res) => {
    return await classServ.addClass(req.body);
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    return await classServ.deleteClass(req.params.id);
}));

router.put('/:id', asyncHandler(async (req, res) => {
    return await classServ.updateClass(req.params.id, req.body);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    return await classServ.getClassById(req.params.id);
}));

router.get('/', asyncHandler(async (req, res) => {
    return await classServ.getAllClass();
}));

module.exports = router;