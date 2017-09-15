const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const csurf = require('csurf');
const mw = require('./routers/middleware');
const socketHandler = require('./socketHandler').handle;



const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

var secret = process.env.SESSION_SECRET || require('./secrets.json').sessionSecret;


app.use(compression());

if (process.env.NODE_ENV != 'production') {
    // app.use(require('./build'));
    app.use('/bundle.js', require('http-proxy-middleware')({
        target: 'http://localhost:8081'
    }));
}

//use all the rest of the middleware here
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieSession({
    name: 'session',
    secret: secret,
    maxAge: 1000 * 60 * 60 * 24 * 14
}));

app.use(csurf());

app.use(function(req, res, next) {
    res.cookie('north_Shore__Wave___Rider', req.csrfToken());
    next();
});

app.use(express.static('./public'));


app.get('/connected/:socketId', mw.loggedInCheck, (req,res) => {
    socketHandler(io, req, res);
    res.json({
        success: 200
    });
});

app.use(require('./routers/routes'));


server.listen(8080, function() {
    console.log("I'm listening.");
});


/************* Socket Logic ***********/
io.on('connection', (socket) => {
    console.log(`socket with the id ${socket.id} is now connected`);
    //check to see if that socket exists in list

    io.emit('welcome', 'hello from server');
});
