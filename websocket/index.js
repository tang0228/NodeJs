const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const path = require("path");

// 创建express实例
const app = express();

const server = http.createServer(app);

app.use(express.static(path.resolve(__dirname, "public")));

const io = socketIO(server);

io.on("connection", socket => {
    console.log("客户端连接了");

    // 接收客户端的信息
    socket.on("msg", chunk => {
        console.log(chunk.toString("utf-8"));
    })

    // 给客户端发送消息
    const timer = setInterval(() => {
        socket.emit("test", "this is server test message");
    }, 2000);

    // 断开连接
    socket.on("disconnect", () => {
        clearInterval(timer);
        console.log("closed");
    });
});

server.listen(2000, () => {
    console.log("port 2000 is listening");
});

