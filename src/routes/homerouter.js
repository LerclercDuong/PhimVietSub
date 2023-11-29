const express = require('express');
const router = express.Router();
const homecontroller = require('../app/controllers/homecontroller');

router.get('/', homecontroller.homepage)
router.get('/updateSingle',homecontroller.updateSingle)
router.get('/add', homecontroller.add);
router.get('/update', homecontroller.add);
router.get('/addpcr', homecontroller.phimchieurap);
router.get('/addseries', homecontroller.phimbo)
// router.get('/:id', homecontroller.findId)
// router.post('/add', homecontroller.addUser)
router.post('/search', homecontroller.search)
module.exports = router;