const express = require('express');
const app = express();
app.get("/news", (req, res, next) => {
    console.log("handler1");
    next(new Error("abc"));
});

app.get("/news", (req, res, next) => {
    console.log("handler3");
    next();
});

app.use('*', require('./errorMiddleware'));

app.listen(2000, () => {
    console.log("server listen 2000");
})