const homerouter = require('./homerouter');
const loginrouter = require('./loginrouter');
const watchrouter = require('./watchrouter');

function route(app){
    app.use('/home', homerouter);
    app.use('/login', loginrouter);
    app.use('/watch',watchrouter);
    // app.use('/movie', res.render(''))
}


module.exports = route;