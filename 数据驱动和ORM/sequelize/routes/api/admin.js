const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../getSendResult');
const adminServ = require('../../services/adminService');
const jwt = require('../jwt');

router.post('/', asyncHandler(async (req, res) => {
    return await adminServ.addAdmin(req.body);
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    return await adminServ.deleteAdmin(req.params.id);
}));

router.put('/:id', asyncHandler(async (req, res) => {
    return await adminServ.updateAdmin(req.params.id, req.body);
}));


router.get('/', asyncHandler(async (req, res) => {
    return await adminServ.getAllAdmin();
}));

router.post('/login', asyncHandler(async (req, res) => {
    const result = await adminServ.login(req.body.loginId, req.body.loginPwd);
    if (result) {
        let value = result.id;
        // 登录成功
        jwt.publish(res, {
            id: value
        });
    };
    return result;
}));

router.get('/whoami', asyncHandler(async (req, res) => {
    return await adminServ.getAdminById(req.userId);
}));

module.exports = router;
