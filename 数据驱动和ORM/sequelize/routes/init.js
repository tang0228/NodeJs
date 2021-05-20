const express = require('express');
const app = express();
const path = require('path');
const staticRoot = path.resolve(__dirname, '../public');
const cors = require('cors');

const session = require('express-session');

// 加入session中间件
app.use(session({
    secret: "tyq",
    name: 'sessionid'
}));
// 映射public目录中的静态资源
app.use(express.static(staticRoot));

const whiteList = ["null", "http://localhost:2000"];
// 加入cors中间件
app.use(cors({
    origin(origin, callback) {
        if (whiteList.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("not allow"));
        }
    },
    credentials: true,
}));

// 加入cookie-parser中间件
// req会加入cookies属性，用于获取请求传来的cookie
// res会加入cookie方法，用于设置cookie
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// 加入token中间件
app.use(require('./tokenMiddleware'));

// 解析application/x-www-form-urlencoded 格式的请求体
app.use(express.urlencoded({ extended: true }));

// 解析application/json 格式的请求体
app.use(express.json());

// 处理api请求
app.use('/api/student', require('./api/student'));
app.use('/api/class', require('./api/class'));
app.use('/api/admin', require('./api/admin'));

// 处理错误的中间件
app.use(require('./errorMiddleware'));

app.listen(2000, () => {
    console.log("server listen 2000");
})