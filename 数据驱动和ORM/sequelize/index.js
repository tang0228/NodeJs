require('./init');

const express = require('express');

const app = express();

app.get('*', (req, res) => {
    console.log(process.env.NODE_ENV);
})
app.listen(3000, () => {
    console.log('监听端口3000');
})

