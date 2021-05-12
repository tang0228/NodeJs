const net = require('net');
const server = net.createServer();

server.listen(10086, () => {
    console.log('连接了10086')
});

server.on('connection', socket => {
    console.log('又客户端连接了');

    socket.on('data', chunk => {
        console.log(chunk.toString('utf-8'));

        socket.write(`HTTP/1.1 200 OK

<!doctype html>
<html dir="ltr" lang="zh">
<head>
<meta charset="utf-8">
<title>新标签页</title>
</head>
<body>
<div>abc</div>
</body>
</html>`)

        socket.end();
    });

    socket.on('end', () => {
        console.log('关闭了');
    });
})
