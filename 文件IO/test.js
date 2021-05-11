const fs = require('fs');
const path = require('path');

class File {
    constructor(filename, name, ext, isFile, size, createTime, updateTime) {
        this.filename = filename;
        this.name = name;
        this.ext = ext;
        this.isFile = isFile;
        this.size = size;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }

    async getContent(isBuffer = false) {
        if (this.isFile) {
            if (isBuffer) {
                return await fs.promises.readFile(this.filename);
            } else {
                return await fs.promises.readFile(this.filename, 'utf-8')
            }
        }
        return null;
    }

    async getChildren() {
        if(this.isFile) {
            return [];
        }
        let children = await fs.promises.readdir(this.filename);
        children = children.map(name => {
            const pathname = path.resolve(this.filename, name);
            return File.getFile(pathname);
        });
        return Promise.all(children);
    }

    static async getFile(filename) {
        const stat = await fs.promises.stat(filename);
        const name = path.basename(filename);
        const ext = path.extname(filename);
        const isFile = stat.isFile();
        const size = stat.size;
        const createTime = new Date(stat.birthtime);
        const updateTime = new Date(stat.mtime);
        return new File(filename, name, ext, isFile, size, createTime, updateTime);
    }
}

async function readDir(dirname) {
    const file = await File.getFile(dirname);
    return await file.getChildren();
}

async function test() {
    const filename = path.resolve(__dirname, './file');
    const res = await readDir(filename);
    console.log(res);
}
test();