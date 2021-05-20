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
        // 登录成功
        req.session.loginUser = result;
    };
    return result;
}));

module.exports = router;
