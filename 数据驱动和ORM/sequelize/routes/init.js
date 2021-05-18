const express = require('express');
const app = express();
const path = require('path');
const staticRoot = path.resolve(__dirname, '../public');

app.use(express.static(staticRoot));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.post('/api/student', (req, res) => {
    console.log(req.body);
})
app.use(require('./errorMiddleware'));

app.listen(2000, () => {
    console.log("server listen 2000");
})