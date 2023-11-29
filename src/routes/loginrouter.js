const express = require('express');
const loginController = require('../app/controllers/logincontrollers')
const router = express.Router()

router.get('/', loginController.RenderLoginPage)

module.exports = router;