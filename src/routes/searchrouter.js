const express = require('express');
const router = express.Router();
const searchcontroller = require('../app/controllers/searchcontroller.js');

router.post('/result',searchcontroller.search)