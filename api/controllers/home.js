const ensureLoggedIn = require('../app/authentication/middleware').ensureLoggedIn

module.exports = function(app) {

    app.get('/', ensureLoggedIn ,(req, res) => {
        res.render('index');
    })

}
