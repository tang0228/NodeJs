const crypto = require('crypto');
const secret = Buffer.from("p14k6r3ri120br9d");
const iv = Buffer.from("f66deedlxremyegb");

exports.encrypto = function (str) {
    const cry = crypto.createCipheriv('aes-128-cbc', secret, iv);
    let result = cry.update(str, "utf-8", "hex");
    result += cry.final("hex");
    return result;
};

exports.decryto = function (str) {
    const dec = crypto.createDecipheriv('aes-128-cbc', secret, iv);
    let result = dec.update(str, "hex", "utf-8");
    result += dec.final("utf-8");
    return result;
};