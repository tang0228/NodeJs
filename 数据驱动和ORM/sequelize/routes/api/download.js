const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/:filename", (req, res) => {
    const absPath = path.resolve(__dirname, "../../public/download", req.params.filename);
    res.download(absPath, req.params.filename);
})

module.exports = router;