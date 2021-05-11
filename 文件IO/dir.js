const fs = require('fs');
const path = require('path');

// async function test() {
//     const res = await fs.promises.readdir(pathname);
//     console.log(res);
// }
// test();

async function create() {
    for (let i = 0; i < 5; i++) {
        await fs.promises.mkdir(path.resolve(__dirname, `./file/${i+1}`));
    }
    console.log('创建成功');
}
create();