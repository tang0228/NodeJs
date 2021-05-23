// const http = require("http");
// module.exports = (req, res, next) => {
//     const context = "/data";
//     if (!req.path.startsWith(context)) {
//         // 不需要代理
//         next();
//         return;
//     }
//     // 需要代理
//     const path = req.path.substr(context.length);
//     const request = http.request({
//         headers: req.headers,
//         method: req.method,
//         host: "yuanjin.tech",
//         path: path,
//         port: 5100
//     }, response => {
//         for (const key in response.headers) {
//             res.setHeader(key, response.headers[key]);
//         }
//         res.status(response.statusCode);

//         response.pipe(res);
//     });

//     req.pipe(request);
// }
const { createProxyMiddleware } = require("http-proxy-middleware");
const context = "/data";
module.exports = createProxyMiddleware(context, {
    target: "http://yuanjin.tech:5100",
    pathRewrite: function (path, req) {
        return path.substr(context.length);
    }
});