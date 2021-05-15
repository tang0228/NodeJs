require('./admin');
require('./book');
require('./class');
require('./student');
const sequelize = require('./db');
sequelize.sync({alter: true}).then(() => {
    console.log('所有模型都同步完成');
})

