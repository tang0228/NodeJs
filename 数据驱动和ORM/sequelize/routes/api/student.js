const express = require('express');
const router = express.Router();
const studentServ = require('../../services/studentService');
const { asyncHandler } = require('../getSendResult');

router.get('/',
    async (req, res) => {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const sex = req.query.sex || -1;
        const result = await studentServ.getStuByPage(page, limit, sex);
        const json = JSON.stringify(result);
        const script = `callback(${json})`;
        res.header('content-type', 'application/javascript').send(script);
    }
);

router.get('/:id',
    asyncHandler(async (req, res) => {
        return await studentServ.getStuById(req.params.id);
    })
);

router.post('/',
    asyncHandler(async (req, res) => {
        return await studentServ.addStudent(req.body);
    })
);

router.delete('/:id',
    asyncHandler(async (req, res) => {
        return await studentServ.deleteStudent(req.params.id);
    })
);

router.put('/:id',
    asyncHandler(async (req, res) => {
        return await studentServ.udpateStudent(req.params.id, req.body);
    })
);

module.exports = router;