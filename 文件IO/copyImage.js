const fs = require('fs');
const path = require('path');

async function copy() {
    const pathname = path.resolve(__dirname, './file/1.jpg');

    const buffer = await fs.promises.readFile(pathname);
    const toPathname = path.resolve(__dirname, './file/1.copy.jpg');
    await fs.promises.writeFile(toPathname, buffer);
    console.log('copy success');
}

copy();