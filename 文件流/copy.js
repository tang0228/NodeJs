const fs = require('fs');
const path = require('path');

async function method1() {
    const from = path.resolve(__dirname, './file/abc2.txt');
    const to = path.resolve(__dirname, './file/abc3.txt');
    console.time('方式一');
    const content = await fs.promises.readFile(from);
    await fs.promises.writeFile(to, content);
    console.timeEnd('方式一');
    console.log('文件复制完成');
}

function method2() {
    const from = path.resolve(__dirname, './file/abc2.txt');
    const to = path.resolve(__dirname, './file/abc3.txt');
    console.time('方式二');

    const rs = fs.createReadStream(from);
    const ws = fs.createWriteStream(to);
    rs.on('data', chunk => {
        const flag = ws.write(chunk);
        if (!flag) {
            // 造成背压，停止读
            rs.pause();
        }
    })

    ws.on('drain', () => {
        // 管道清空，可以继续读写
        rs.resume();
    })

    rs.on('close', () => {
        ws.end();
        console.timeEnd('方式二');
        console.log('文件复制完成');
    })
}

function method3() {
    const from = path.resolve(__dirname, './file/abc2.txt');
    const to = path.resolve(__dirname, './file/abc3.txt');
    console.time('方式三');

    const rs = fs.createReadStream(from);
    const ws = fs.createWriteStream(to);
    rs.pipe(ws);

    rs.on('close', () => {
        console.timeEnd('方式三');
    })
}
method3();