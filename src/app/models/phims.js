const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const phims = new Schema({
   movie: {
  _id:String,
    name: String, 
    origin_name: String,
    content: String,
    type: String,
    chieurap: Boolean,
    status: String,
    trailer_url: String,
    quality: String,
    lang: String,
    actor: Array, 
    category: Array,
    country: Array,
    thumb_url: String,
    poster_url: String,
    slug: String,
    year: Number
   },
   
   
    episodes:Array,
    //  [{
    //     server_name: String,
    //     server_data: [{
    //       link_embed: String,
    //       link_m3u8: String
    //     }]
    //   },]
    
},{ typeKey: '$type' });


module.exports =  mongoose.model('phims', phims);