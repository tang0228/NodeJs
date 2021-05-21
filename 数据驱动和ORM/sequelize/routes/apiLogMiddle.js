const { apiLogger } = require('../logger');
const log4js = require('log4js');

// module.exports = (req, res, next) => {
//     next();
//     apiLogger.debug(`${req.method} ${req.url} ${req.ip}`)
// } 

module.exports = log4js.connectLogger(apiLogger, {
    level: 'auto'
})
