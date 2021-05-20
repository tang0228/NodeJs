const { getErr } = require('./getSendResult');
const { pathToRegexp } = require('path-to-regexp');
const jwt = require('../routes/jwt');
// token中间件
const needTokenApi = [
    { method: "POST", path: "/api/student" },
    { method: "PUT", path: "/api/student/:id" },
    { method: "GET", path: "/api/admin/whoami" },
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
    const result = jwt.verify(req);
    if (result) {
        // 认证通过
        req.userId = result.id;
        next();
    } else {
        // 未通过认证
        hanleNonToken(req, res, next);
    }
};

function hanleNonToken(req, res, next) {
    res.status(403).send(getErr("you don not have token to access the api", 403))
}