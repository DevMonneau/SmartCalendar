const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const compression = require('compression')
const path = require('path')
const configuration = require('../configuration/configuration')
const loggerConfiguration = require('../configuration/logger/loggerConfiguration')
const logger = require('../configuration/logger/logger')
const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash');
const homeController = require('../controllers/home')
const userController = require('../controllers/user')

const REQUEST_SIZE_LIMIT = configuration.server.requestSizeLimit
const app = express()

// Use logger
app.use(morgan(loggerConfiguration.morganConfiguration))

// set up view engine

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, '../public')));

// flash messages
app.use(flash());

// Configure pasport
app.use(session({
  secret: configuration.mongo.secret,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

// initialise passport
var initPassport = require('./authentication/init');
initPassport(passport);

// Configure body-parser
app.use(bodyParser.urlencoded({
  extended: true,
  limit: REQUEST_SIZE_LIMIT
}))
app.use(bodyParser.json({
  limit: REQUEST_SIZE_LIMIT
}))

// Use compression
app.use(compression())

// Load mongo
require('../models/db')

// Load les controllers
logger.info(`Loading controllers`)
homeController(app)
userController(app)


// 404 errors
app.use((req, res, next) => {
  logger.error(`A request could not be fulfilled on ${req.path}`)
  res.sendStatus(404)
})

// Errors
app.use((err, req, res, next) => {
  logger.error(`An error occurred while receiving a request : ${err}`)
  res.sendStatus(500)
})

module.exports = app
