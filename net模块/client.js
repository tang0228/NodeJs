const net = require('net');
const socket = net.createConnection({
    host: 'duyi.ke.qq.com',
    port: 80
}, () => {
    console.log('连接成功');
})

socket.on('data', chunk => {
    console.log('来自服务器的消息', chunk.toString('utf-8'));
})


socket.write(`GET / HTTP/1.1
Host: duyi.ke.qq.com
Connection: keep-alive

`);
