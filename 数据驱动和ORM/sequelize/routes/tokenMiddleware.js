const { getErr } = require('./getSendResult');
const { pathToRegexp } = require('path-to-regexp');
const crypt = require('../util/crypt');
// token中间件
const needTokenApi = [
    { method: "POST", path: "/api/studnet" },
    { method: "PUT", path: "/api/studnet/:id" },
];
module.exports = (req, res, next) => {
    const apis = needTokenApi.filter(api => {
        const reg = pathToRegexp(api.path);
        return api.method === req.method && reg.test(req.path);
    });
    if (apis.length === 0) {
        next();
        return;
    }
    // 浏览器
    let token = req.cookies.token;
    // 其它终端
    if (!token) {
        token = req.headers.authorization;
    }
    if (!token) {
        // 没有token
        hanleNonToken(req, res, next);
        return;
    }
    // 验证通过
    const userId = crypt.decryto(token);
    req.userId = userId;
    next();
};

function hanleNonToken(req, res, next) {
    res.status(403).send(getErr("you don not have token to access the api", 403))
}