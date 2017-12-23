var json = require('morgan-json')
var moment = require('moment')

// Based On Morgan 'combined' format
var morganConfiguration = json({
  request : ':method :url :status HTTP/:http-version',
  length : ':res[content-length]',
  responseTime : ':response-time ms',
  remoteAddr : ':remote-addr',
  remoteUser : ':remote-user',
  date : ':date[iso]',
  referrer : ':referrer',
  userAgent : ':user-agent'
})

var winstonConfiguration = {
    level: 'debug',
    silent: false,
    colorize: false,
    timestamp: function() {
        return (moment().format('YYYY-MM-DD hh:mm:ss').trim())
    },
    json: true,
    stringify: true,
    prettyPrint: true,
    showLevel:true
}

module.exports = {
    morganConfiguration : morganConfiguration,
    winstonConfiguration : winstonConfiguration
}