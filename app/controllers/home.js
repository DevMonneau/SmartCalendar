const ensureLoggedIn = require('../authentication/middleware').ensureLoggedIn

module.exports = function(app) {

    app.get('/', ensureLoggedIn ,(req, res) => {
        res.status(200).send('Welcome')
    })

}