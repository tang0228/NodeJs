const allowOrign = ["http://127.0.0.1:5500", "null"];

module.exports = function (req, res, next) {
    // 处理预检请求
    if (req.method === 'OPTIONS') {
        res.header("access-control-allow-origin", req.headers.origin);
        res.header("access-control-allow-methods", req.headers["access-control-request-methods"]);
        res.header("access-control-allow-headers", req.headers["access-control-request-headers"]);
    }
    // 处理简单请求
    if ("origin" in req.headers && allowOrign.includes(req.headers.origin)) {
        res.header("access-control-allow-origin", req.headers.origin);
    }
    // 处理带有身份凭证的请求
    res.header('access-control-allow-credentials', true);
    next();
}