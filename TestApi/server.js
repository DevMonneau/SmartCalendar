var bodyParser = require('body-parser');  
var morgan = require('morgan');  
var passport = require('passport');  
var jwt = require('jsonwebtoken');
var express = require('express');
var mongoose = require('mongoose');
var app = express();
var User = require('./models/user');

// Use body-parser to get POST requests for API use
app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());

// Log requests to console
app.use(morgan('dev'));  

app.use(passport.initialize()); 
require('./config/passport')(passport); 

// Home route. We'll end up changing this to our main front end index later.
app.get('/', function(req, res) {  
  res.send('Relax. We will put the home page here later.');
});

var apiRoutes = express.Router();  
// Register new users
apiRoutes.post('/register', function(req, res) {  
  if(!req.body.email || !req.body.password) {
    res.json({ success: false, message: 'Please enter email and password.' });
  } else {
    var newUser = new User({
      email: req.body.email,
      password: req.body.password
    });

    // Attempt to save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({ success: false, message: 'That email address already exists.'});
      }
      res.json({ success: true, message: 'Successfully created new user.' });
    });
  }
});

apiRoutes.post('/authenticate', function(req, res) {  
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.send({ success: false, message: 'Authentication failed. User not found.' });
    } else {
      // Check if password matches
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (isMatch && !err) {
          // Create token if the password matched and no error was thrown
          var token = jwt.sign(user.toJSON(), 'louislebg', {
            expiresIn: 10080 // in seconds
          });
          res.json({ success: true, token: 'Bear ' + token });
        } else {
          res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
        }
      });
    }
  });
});

// Protect dashboard route with JWT
apiRoutes.get('/dashboard', passport.authenticate('jwt', { session: false }), function(req, res) {  
  res.send('It worked! User id is: ' + req.user._id + '.');
});

// Set url for API group routes
app.use('/', apiRoutes);  

// Connect to database

app.listen(3000, () => console.log('Example app listening on port 3000!'));
