const ensureLoggedIn = require('../app/authentication/middleware').ensureLoggedIn

module.exports = function(app) {

    app.get('/home', ensureLoggedIn ,(req, res) => {
        res.status(200).send('Welcome')
    })

}
