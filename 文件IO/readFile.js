const fs = require('fs');
const path = require('path');

const pathname = path.resolve(__dirname, './file/1.txt');

// fs.readFile(pathname, 'utf-8', (err, data) => {
//     console.log(data);
// })


async function test() {
    const content = await fs.promises.readFile(pathname, 'utf-8');
    console.log(content);
}
test();
