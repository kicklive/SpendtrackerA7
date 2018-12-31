var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');
console.log('rp==>' + rootPath);
console.log('port==>' + process.env.PORT);
module.exports = {
    development: {
        db: 'mongodb://localhost/Spendtracker2018',
        rootPath: rootPath,
        port: process.env.PORT || 3000

    },
    production: {
        db: 'mongodb://kicklive:spendtracker@ds117858.mlab.com:17858/spendtracker2018',
        rootPath: rootPath,
        port: process.env.PORT || 80

    }
    
};