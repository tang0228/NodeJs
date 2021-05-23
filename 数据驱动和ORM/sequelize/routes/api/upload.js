const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const jimp = require("jimp");
/**
 * 给一张图片加水印
 * @param {*} waterPath 水印图片路径
 * @param {*} originPath 元素图片路径
 * @param {*} targetPath 目标元素路径
 * @param {*} proportion 缩放比
 * @param {*} marginProportion 距离侧边距离
 */
async function addWater(waterPath, originPath, targetPath, proportion = 10, marginProportion = 0.05) {
    const [water, origin] = await Promise.all([jimp.read(waterPath), jimp.read(originPath)]);
    const curProportion = origin.bitmap.width / water.bitmap.width;
    water.scale(curProportion / proportion);

    const right = origin.bitmap.width * marginProportion;
    const bottom = origin.bitmap.height * marginProportion;

    const x = origin.bitmap.width - water.bitmap.width - right;
    const y = origin.bitmap.height - water.bitmap.height - bottom;

    origin.composite(water, x, y, {
        mode: jimp.BLEND_SOURCE_OVER,
        opacitySource: 0.3,
    });

    await origin.write(targetPath);
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, "../../public/origin"))
    },
    filename: function (req, file, cb) {
        const randomStr = Math.random().toString(36).slice(-8);
        const ext = path.extname(file.originalname);
        const fileName = `${randomStr}${ext}`
        cb(null, fileName);
    }
})

var upload = multer({
    storage,
    limits: {
        // fileSize: 100 * 1024
    },
    fileFilter(req, file, cb) {
        const ext = path.extname(file.originalname);
        const whitelist = [".jpg", ".png", ".gif"];
        if (whitelist.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error("not suport this ext of file"));
        }
    }
})

router.post("/", upload.single("img"), async (req, res) => {
    const url = `/upload/${req.file.filename}`;
    const waterPath = path.resolve(__dirname, "../../public/img/water.png");
    const originPath = path.resolve(req.file.path);
    const targetPath = path.resolve(__dirname, "../../public/upload", req.file.filename);

    await addWater(waterPath, originPath, targetPath);

    res.send({
        code: 0,
        msg: "",
        data: url
    })
});

module.exports = router;