const mongoose = require('mongoose');

const local = "mongodb://localhost:27017/duongminhtri_dev";
const cluster = "mongodb+srv://doantri2003:doantri123@cluster1.etpb2ti.mongodb.net/webphim";
function connect(){
    mongoose.connect(cluster)
    .then(function(response){
        console.log('da ket noi')
    })
}


module.exports = {connect}