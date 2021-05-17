const log4js = require('log4js');
const path = require('path');

log4js.configure({
    appenders: {
        sql: {
            type: 'dateFile',
            filename: path.resolve(__dirname, 'logs', 'sql', 'logging.log'),
            maxLogSize: 1024 * 1024,
            keepFileExt: true,
            layout: {
                type: "pattern",
                pattern: "%c [%{yyyy-MM-dd hh:mm:ss}] [%p]: %m%n",
            },
        },
        default: {
            type: 'stdout',
        },
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
    },
});

process.on('exit', () => {
    log4js.shutdown();
});

exports.sqlLogger = log4js.getLogger('sql');
exports.defaultLogger = log4js.getLogger();