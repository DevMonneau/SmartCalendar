var winston = require('winston')
var loggerConfiguration = require('./loggerConfiguration')

var winstonConfiguration = loggerConfiguration.winstonConfiguration

var transports = []
transports.push(new winston.transports.Console(winstonConfiguration))

var logger = new winston.Logger({transports: transports})

module.exports = logger