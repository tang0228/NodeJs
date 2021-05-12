const http = require('http');
const requset = http.request('http://duyi.ke.qq.com/', {
    method: 'GET'
}, resp => {
    console.log('服务器响应状态码', resp.statusCode);
    console.log('服务器的content-type', resp.headers['content-type']);
    let result = '';
    resp.on('data', chunk => {
        result += chunk.toString('utf-8');
    });

    resp.on('end', () => {
        console.log(result);
    })

});

requset.write('a');
requset .end(); // 表示消息体结束