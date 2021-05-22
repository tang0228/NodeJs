const sendMsg = require('./getSendResult');
const multer = require("multer");
module.exports = (err, req, res, next) => {
    if (err) {
        if (err instanceof multer.MulterError) {
            res.status(500).send(sendMsg.getErr(err.message));
            return;
        }
        const errObj = err instanceof Error ? err.message : err;
        res.status(500).send(sendMsg.getErr(errObj));
    } else {
        next();
    }
}