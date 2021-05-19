const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../getSendResult');
const adminServ = require('../../services/adminService');
const crypt = require('../../util/crypt');

router.post('/', asyncHandler(async (req, res) => {
    return await adminServ.addAdmin(req.body);
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    return await adminServ.deleteAdmin(req.params.id);
}));

router.put('/:id', asyncHandler(async (req, res) => {
    return await adminServ.updateAdmin(req.params.id, req.body);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    return await adminServ.getAdminById(req.params.id);
}));

router.get('/', asyncHandler(async (req, res) => {
    return await adminServ.getAllAdmin();
}));

router.post('/login', asyncHandler(async (req, res) => {
    const result = await adminServ.login(req.body.loginId, req.body.loginPwd);
    if (result) {
        let value = result.id;
        value = crypt.encrypto(value.toString());
        // 适配浏览器
        res.cookie("token", value, {
            path: '/',
            domain: "localhost",
            maxAge: 7 * 24 * 3600 * 1000
        });
        // 适配其它终端
        res.header("authorization", value);
    };
    return result;
}));

module.exports = router;
