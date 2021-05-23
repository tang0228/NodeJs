const express = require("express");
const router = express.Router();
const svgCaptcha = require("svg-captcha");


router.get("/captcha", (req, res) => {
    const c = svgCaptcha.create({
        color: true,
        noise: 3
    });
    req.session.captcha = c.text.toLowerCase(); // 将验证码文本存入session中

    res.type("svg");
    res.status(200).send(c.data);
});

function checkCaptcha(req, res, next) {
    const captcha = req.body.captcha ? req.body.captcha.toLowerCase() : "";
    if (captcha !== req.session.captcha) {
        // 验证码错误
        res.send({
            code: 401,
            msg: "验证码错误"
        });
    } else {
        next();
    }
    req.session.captcha = ""; // 每一次比对验证码后，将session中的验证码清空
}

function handleAsync(req, res, next) {
    if (!req.session.records) {
        req.session.records = [];
    }
    const now = Date.now();
    req.session.records.push(now);
    const duration = 10000;
    const allowNums = 3; // 允许最带连续请求次数
    req.session.records = req.session.records.filter(time => {
        return (now - time) <= duration;
    });

    if (req.session.records.length > allowNums || "captcha" in req.body) {
        // 验证验证码
        checkCaptcha(req, res, next);
    } else {
        next();
    }
}

router.post("*", handleAsync)
router.put("*", handleAsync)
module.exports = router;