const fs = require('fs');
const path = require('path');
const filename = path.resolve(__dirname, './file/abc2.txt');

const ws = fs.createWriteStream(filename, {
    encoding: 'utf-8',
    highWaterMark: 3
})


let i = 0;
function write() {
    let flag = true;
    while(i < 1024*1024 && flag) {
        flag = ws.write('a');
        i++;
    }
}
ws.on('drain', () => {
    write();
})

write();