const users = require('../models/users')

class loginController {
    RenderLoginPage(req, res, next){
      res.render('partials/login', {layout: 'layouts/login-layout'})
    }

    LoginPage(req, res, next){


    }
}

module.exports = new loginController;