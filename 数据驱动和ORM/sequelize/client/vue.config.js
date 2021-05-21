const path = require('path');

module.exports = {
    devServer: {
        proxy: {
            "api": {
                target: "http://localhost:2000"
            }
        }
    },
    outputDir: path.resolve(__dirname, '../public')
}