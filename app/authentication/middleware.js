function ensureLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next()
	res.redirect('/vatefairefoutre')
}

module.exports = {
    ensureLoggedIn : ensureLoggedIn
}