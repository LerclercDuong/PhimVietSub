const axios = require('axios').default;
const phims = require('../models/phims')

class searchcontroller{
      search(req, res, next){
        const result = req.body.name;
      }
}


module.exports = new searchcontroller;