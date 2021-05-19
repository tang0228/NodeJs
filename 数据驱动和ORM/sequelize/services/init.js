const validate = require('validate.js');
const moment = require('moment');

validate.extend(validate.validators.datetime, {
    /**
     * 该函数会自动作用于日期格式转换
     * 它在验证时自动触发，需要将任何数据转换为时间戳返回
     * 如果无法转换，返货NAN
     * @param {*} value 传入要转换的数据
     * @param {*} options 对属性严重的配置
     */
    parse(value, options) {
        let formats = ['YYYY-MM-DD HH:mm:ss', 'YYYY-M-D H:m:s', 'x'];
        if (options.dateOnly) {
            formats = ["YYYY-MM-DD", "YYYY-M-D", "x"];
        }
        return +moment.utc(value, formats, true);
    },
    /**
     * 显示错误信息时，使用的显示字符串
     * @param {*} value 
     * @param {*} options 
     */
    format(value, options) {
        let format = "YYYY-MM-DD";
        if (!options.dateOnly) {
            format += " HH:mm:ss";
        }
        return moment.utc(value).format(format);
    }
})