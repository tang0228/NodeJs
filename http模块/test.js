const http = require('http');
const path = require('path');
const url = require('url');
const fs = require('fs');

// 得到文件的状态信息
async function getStat(filename) {
    try {
        return await fs.promises.stat(filename)
    } catch {
        return null;
    }
}
/**
 * 得到文件内容
 * @param {路径} link 
 * @returns 文件内容
 */
async function getFileInfo(link) {
    const urlObj = url.parse(link);
    let filename = path.resolve(__dirname, 'public', urlObj.pathname.substr(1));
    const stat = await getStat(filename);
    if (!stat) {
        // 文件不存在
        return null;
    } else if (stat.isDirectory()) {
        filename = path.resolve(__dirname, 'public', urlObj.pathname.substr(1), 'index.html');
        const stat = await getStat(filename);
        if (!stat) {
            return null;
        } else {
            // 文件存在
            return fs.promises.readFile(filename);
        }
    } else {
        // 文件存在
        return fs.promises.readFile(filename);
    }
}

//  处理函数
async function handler(req, res) {
    const info = await getFileInfo(req.url);
    if (info) {
        res.write(info);
    } else {
        res.statusCode = 404;
        res.write('not found');
    }
    res.end();
}

const server = http.createServer(handler);

server.listen(2000, () => {
    console.log('listen start 2000');
})