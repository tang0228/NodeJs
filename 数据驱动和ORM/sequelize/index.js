// const sequelize = require('./models/db');

// (async function () {
//     try {
//         await sequelize.authenticate();
//         console.log('successfully');
//     } catch (err) {
//         console.log(err);
//     }
// })();

// require('./models/sync');

const adminServe = require('./services/adminService');
// adminServe.addAdmin({
//     loginId: 'abc',
//     loginPwd: '123456',
//     name: 'tyq'
// });

// adminServe.deleteAdmin(6).then(r => {
//     console.log(r);
// });

adminServe.updateAdmin(4, {
    loginId: '000000',
}).then(r => {
    console.log(r);
})