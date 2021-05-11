const fs = require('fs');

const path = require('path');

const pathname = path.resolve(__dirname, './file/2.txt');

async function test() {
    // await fs.promises.writeFile(pathname, '撒大苏打撒旦');

    const buffer = Buffer.from('abcdef', 'utf-8');
    await fs.promises.writeFile(pathname, buffer);
    console.log('写入成功');
}
test();