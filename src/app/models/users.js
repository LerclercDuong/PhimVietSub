const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const users = new Schema({
    username: String,
    password: String
});


module.exports =  mongoose.model('users', users);;