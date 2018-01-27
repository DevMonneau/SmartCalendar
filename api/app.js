import { lstat } from 'fs';

const app = require('./app/index')
const PORT = require('./configuration/configuration').server.port
const logger = require('./configuration/logger/logger')

app.listen(PORT, function (err) {
  if (err) {
    throw err
  }
  logger.info(`Server is listening on ${PORT}...`)
})

