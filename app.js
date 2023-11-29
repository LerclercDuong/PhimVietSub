const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path')
const expressLayouts = require('express-ejs-layouts')
const route = require('./src/routes/index.js');
const db = require('./src/config/db/database')
const axios = require('axios').default;

app.use(express.urlencoded({ extended: true}))
app.set('views',path.join(__dirname, 'src/resources/views'))
app.set('view engine', 'ejs');

app.use(expressLayouts)
app.set('layout', path.join(__dirname, 'src/resources/views/layouts'))

db.connect()

route(app)

app.listen(port, function(error){
    if (error) {
        console.log("Something went wrong");
    }
    console.log("server is running port:  " + port);
})


// cài EJS
// path