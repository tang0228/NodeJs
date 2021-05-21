// 颁发jwt
const jwt = require('jsonwebtoken');
const secret = "tangyuanqing";
const cookieKey = "token";
exports.publish = function (res, info = {}, maxAge = 3600 * 24 * 1000) {
    const token = jwt.sign(info, secret, {
        expiresIn: maxAge,
    });
    // 设置authorization
    res.header("authorization", token);
};

// 验证jwt
exports.verify = function (req) {
    let token = req.headers.authorization;
    if (!token) {
        return null;
    }
    token = token.split(" ");
    token = token.length === 1 ? token[0] : token[1];
    try {
        return jwt.verify(token, secret);
    } catch {
        return null;
    }
}