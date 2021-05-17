require('./models/relation');
// require('./spider/fetchBooks');

const stuServ = require('./services/studentService');
stuServ.getStuByPage(1, 10, '男').then(r => {
    console.log(r);
})