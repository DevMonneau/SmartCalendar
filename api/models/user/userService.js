var logger = require('../../configuration/logger/logger')
var db = require('../db')

var User = db.User


function findById(userId){
  logger.debug(`Find User By Id ${userId}`)
  return User
          .findOne({_id : userId})
          .exec()
}

function findByUsername(username){
  logger.debug(`Find User By username ${username}`)
  return User
          .findOne({username : username})
          .exec()
}

module.exports = {
  findById : findById,
  findByUsername : findByUsername
}