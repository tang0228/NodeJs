const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, "../../public/upload"))
    },
    filename: function (req, file, cb) {
        const randomStr = Math.random().toString(36).slice(-8);
        const ext = path.extname(file.originalname);
        const fileName = `${randomStr}${ext}`
        cb(null, fileName);
    }
})

var upload = multer({ storage, 
    limits: {
        fileSize: 100 * 1024
    },
    fileFilter(req, file, cb) {
        const ext = path.extname(file.originalname);
        const whitelist = [".jpg", ".png", ".gif"];
        if(whitelist.includes(ext)) {
            cb(null, true);
        }else {
            cb(new Error("not suport this ext of file"));
        }
    }
})

router.post("/", upload.single("img"), (req, res) => {
    const url = `/upload/${req.file.filename}`;
    res.send({
        code: 0,
        msg: "",
        data: url
    })
});

module.exports = router;