const net = require("net");
const server = net.createServer((socket) => {
    console.log("收到客户端的连接");
    socket.once("data", chunk => {
        const httpContent = chunk.toString("utf-8");
        let con = httpContent.split("\r\n");
        con.shift();
        con = con.filter(it => it).map(it => {
            const i = it.indexOf(":");
            return [it.substr(0, i), it.substr(i + 1).trim()]
        });
        const headers = Object.fromEntries(con);

        const crypto = require("crypto");
        const hash = crypto.createHash("sha1");
        hash.update(
            headers["Sec-WebSocket-Key"] + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"
        );
        const key = hash.digest("base64");
        // 响应
        socket.write(`HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: ${key}

`);
        socket.on("data", (chunk) => {
            console.log(chunk);
        });
    });
});

server.listen(2000);