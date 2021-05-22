const express = require('express');
const app = express();
const path = require('path');
const staticRoot = path.resolve(__dirname, '../public');
const cors = require('cors');

const history = require('connect-history-api-fallback');
app.use(history());

// 映射public目录中的静态资源
app.use(express.static(staticRoot));

// 加入cors中间件
app.use(cors({
    origin(origin, callback) {
        if (!origin) {
            callback(null, "*");
            return;
        }
        callback(null, origin);
    },
    credentials: true,
}));

// 加入cookie-parser中间件
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// 加入token中间件
app.use(require('./tokenMiddleware'));

// 解析application/x-www-form-urlencoded 格式的请求体
app.use(express.urlencoded({ extended: true }));

// 解析application/json 格式的请求体
app.use(express.json());

app.use(require('./apiLogMiddle'));

// 处理api请求
app.use('/api/student', require('./api/student'));
app.use('/api/class', require('./api/class'));
app.use('/api/admin', require('./api/admin'));
app.use('/api/upload', require('./api/upload'));

// 下载文件的中间件
app.use('/res', require('./api/download'));



// 处理错误的中间件
app.use(require('./errorMiddleware'));

app.listen(2000, () => {
    console.log("server listen 2000");
})