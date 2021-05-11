const fs = require('fs');

const path = require('path');

const pathname = path.resolve(__dirname, './file/1.txt');

async function test() {
    const stat = await fs.promises.stat(pathname);
    console.log(stat);
    console.log('是否是目录', stat.isDirectory());
    console.log('是否是文件', stat.isFile());
}   
test();