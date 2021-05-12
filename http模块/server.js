const http = require('http');



function handleReq(req) {
    console.log('请求来了');
    console.log(req.url);
    console.log('请求头', req.headers);
    console.log('请求方法', req.method);

    let body = '';

    req.on('data', chunk => {
        body += chunk.toString('utf-8');
    });

    req.on('end', () => {
        console.log(body);
    })
}
const server = http.createServer((req, res) => {
    handleReq(req);

    res.setHeader('a', 1);
    res.setHeader('b', 2);

    res.write('hello');
    res.end();
 
});

server.listen(1000, () => {
    console.log('监听端口1000');
})