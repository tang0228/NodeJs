const Mock = require('mockjs');
const Class = require('../models/class');

const result = Mock.mock({
    "datas|16": [{
        "id|+1": 1,
        name: "前端第 @id 期",
        openDate: "@date"
    }]
}).datas;
Class.bulkCreate(result);