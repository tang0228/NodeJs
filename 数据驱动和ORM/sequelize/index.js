require('./models/relation');
const adminServ = require('./services/adminService');
adminServ.login('abc', '456').then(r => {
    console.log(r);
})
