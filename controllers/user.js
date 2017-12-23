const passport = require('passport')

module.exports = function(app) {

	app.get('/', function(req, res) {
		res.render('login', { message: req.flash('message') })
	})

	/* POST login */
	app.post('/', passport.authenticate('login', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash : true
	}))

	/* GET Registration  */
	app.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')})
	})

	/* Handle Registration POST */
	app.post('/signup', passport.authenticate('signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash : true
	}))

	/* GET Home Page */
	/* Handle Logout */
	app.get('/signout', function(req, res) {
		req.logout()
		res.redirect('/login');
	})
}