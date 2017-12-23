var mongoose = require('mongoose')

var Schema = mongoose.Schema

var schema = new Schema({
    username: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String
})

module.exports = mongoose.model('User', schema)