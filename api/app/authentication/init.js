var LocalStrategy   = require('passport-local').Strategy;
var User = require('../../models/db').User;
var userService = require('../../models/user/userService');
var bCrypt = require('bcrypt');
var logger = require('../../configuration/logger/logger');
module.exports = function(passport){

    passport.serializeUser(function(user, done) {
        done(null, user._id)
    })

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user)
        })
    })
    // login
    passport.use('login', new LocalStrategy({
                passReqToCallback : true
            },
            function(req, username, password, done) {
                userService
                    .findByUsername(username)
                    .then((user) => {
                        if (user == null){
                            logger.info(`User Not Found with username ${username}`)
                            return done(null, false, req.flash('message', 'User Not found.'))
                        }
                        if (!isValidPassword(user, password)){
                            logger.info('Invalid Password')
                            return done(null, false, req.flash('message', 'Invalid Password'))
                        }
                        return done(null, user)
                    })

            })
        )
        var isValidPassword = function(user, password){
            return bCrypt.compareSync(password, user.password);
        }

    // signup
    passport.use('signup', new LocalStrategy({
                passReqToCallback : true
            }, function(req, username, password, done) {
                findOrCreateUser = function(){
                    userService
                        .findByUsername(username)
                        .then((user) => {
                            if (user) {
                                logger.info('User already exists with username: '+username)
                                return done(null, false, req.flash('message','User Already Exists'))
                            } else {
                                var newUser = new User()
                                newUser.username = username
                                newUser.password = createHash(password)
                                newUser.email = req.param('email')
                                newUser.firstName = req.param('firstName')
                                newUser.lastName = req.param('lastName')
                                newUser.save(function(err) {
                                    if (err){
                                        logger.info('Error in Saving user: '+err)
                                        throw err
                                    }
                                    logger.info('User Registration succesful')
                                    return done(null, newUser)
                                })
                            }
                        })
                        .catch((err) => {
                            logger.debug('Error in SignUp: '+err);
                            return done(err)
                        })
                };
                process.nextTick(findOrCreateUser)
            })
        )
        var createHash = function(password){
            return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
        }
}