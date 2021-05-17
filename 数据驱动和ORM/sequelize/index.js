require('./init');
const stuSrve = require('./services/studentService');
// stuSrve.addStudent({
//     name: 'abc',
//     birthday: '2001-5-3',
//     sex: true,
//     mobile: '14797857310',
//     ClassId: '5',
//     a: 1,
//     b: 2
// }).catch(err => {
//     console.log(err);
// })

stuSrve.getStuByPage().then(r => {
    console.log(r);
})

