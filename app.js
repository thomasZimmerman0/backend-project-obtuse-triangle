const express = require('express');
const app = express();
const port = 3000;
app.listen(port);
const cookieSession = require('cookie-session');

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}))
app.use(express.json())


const passport = require('passport');
require('./auth/passport-config')(passport)
app.use( passport.initialize() );
app.use( passport.session() );

app.use(cookieSession({
    name: 'session', 
    keys: ['alsd;lasjlaskdjlsj;slkjas'], 
    maxAge: 14 * 24 * 60 * 60 * 1000
}))


//-------------------------------------------------------------------------------------


app.use(require('./routes/index.js'))


//-------------------------------------------------------------------------------------