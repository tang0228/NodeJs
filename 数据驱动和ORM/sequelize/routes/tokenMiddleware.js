const { getErr } = require('./getSendResult');
const { pathToRegexp } = require('path-to-regexp');
const crypt = require('../util/crypt');
// token中间件
const needTokenApi = [
    { method: "POST", path: "/api/student" },
    { method: "PUT", path: "/api/student/:id" },
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
    if (req.session.loginUser) {
        // 已经登录过了
        next();
    } else {
        // 未登录
        hanleNonToken(req, res, next);
    }
};

function hanleNonToken(req, res, next) {
    res.status(403).send(getErr("you don not have token to access the api", 403))
}