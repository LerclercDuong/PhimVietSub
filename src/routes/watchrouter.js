const express = require('express');
const router = express.Router();
const watchController = require('../app/controllers/watchcontroller');

router.get('/:slug', watchController.watch)
module.exports = router;