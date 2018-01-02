var mongoose = require('mongoose')

var configuration = require('../configuration/configuration')
var logger = require('../configuration/logger/logger')

mongoose.Promise = require('q').Promise

// Build the connection string
var mongoDbOptions = {
  uri: configuration.mongo.url,
  user: configuration.mongo.user,
  pass: configuration.mongo.password,
  server: {
    poolSize: configuration.mongo.poolSize,
    reconnectTries: Number.MAX_VALUE
  }
}

// Create the database connection
logger.info(`Trying to connect to MongoDB using : `, mongoDbOptions)
mongoose.connect(mongoDbOptions.uri, mongoDbOptions)

// When successfully connected
mongoose.connection.on('connected', () => {
  logger.info('Successfully connected to MongoDB')
})

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  logger.error(`Connection error for MongoDB ${err}`)
})

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  logger.info('MongoDB connection has been disconnected')
})

// Log Mongodb Request as Json
configuration.mongo.debug === false ? mongoose.set('debug', false) : mongoose.set('debug', function (collectionName, method, query, doc) {
  logger.debug('Mongoose Query', {collectionName : collectionName, method : method, query : JSON.stringify(query), doc : JSON.stringify(doc)})
});


// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    logger.debug('MongoDB connection has been release through application termination')
    process.exit(0)
  })
})

function dropCurrentDatabase(){
  mongoose.connection.db.dropDatabase((err,result) => {
    if(err){
      logger.error('Error while dropping database', err)
    } else {
      logger.info('Current Database has been dropped !')
    }
  })
}

// Bring in schemas and models
module.exports = {
  User: require('./user/userModel'),
  dropCurrentDatabase: dropCurrentDatabase
}