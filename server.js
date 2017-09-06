const express = require('express');
const app = express();
const compression = require('compression');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const handler = require('./handler').handle;
var secret = process.env.SESSION_SECRET || require('./secrets.json').sessionSecret;


app.use(compression());

if (process.env.NODE_ENV != 'production') {
    app.use(require('./build'));
}

//use all the rest of the middleware here
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieSession({
    name: 'session',
    secret: secret,
    maxAge: 1000 * 60 * 60 * 24 * 14
}));
app.use(express.static('./public'));

app.use(require('./routers/routes'));

app.listen(8080, function() {
    console.log("I'm listening.")
});
