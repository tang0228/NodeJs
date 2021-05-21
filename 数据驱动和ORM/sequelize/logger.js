const log4js = require('log4js');
const path = require('path');

function getConfig(filePath) {
    return {
        type: 'dateFile',
        filename: path.resolve(__dirname, 'logs', filePath, 'logging.log'),
        maxLogSize: 1024 * 1024,
        keepFileExt: true,
        daysToKeep: 2,
        layout: {
            type: "pattern",
            pattern: "%c [%{yyyy-MM-dd hh:mm:ss}] [%p]: %m%n",
        },
    };
}
log4js.configure({
    appenders: {
        sql: getConfig('sql'),
        default: {
            type: 'stdout',
        },
        api: getConfig('api'),
    },
    categories: {
        sql: {
            appenders: ['sql'],
            level: 'all',
        },
        default: {
            appenders: ['default'],
            level: 'all',
        },
        api: {
            appenders: ['api'],
            level: 'all'
        }
    },
});

process.on('exit', () => {
    log4js.shutdown();
});

exports.sqlLogger = log4js.getLogger('sql');
exports.defaultLogger = log4js.getLogger();
exports.apiLogger = log4js.getLogger('api');
