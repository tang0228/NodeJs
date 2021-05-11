const fs = require('fs');
const path = require('path');

const pathname = path.resolve(__dirname, './file/1');


async function exist(filename) {
    try {
        await fs.promises.stat(filename);
        return true;
    } catch (err) {
        if (err.code === 'ENOENT') {
            return false;
        }
        throw err;
    }
}

async function test() {
    const res = await exist(pathname);
    if(res) {
        console.log('目录已存在');
    } else {
       await fs.promises.mkdir(pathname);
    }
}

test();