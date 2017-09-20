const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const csurf = require('csurf');
const mw = require('./routers/middleware');
const socketHandler = require('./socketHandler');



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


app.post('/connected/:socketId', mw.loggedInCheck, (req,res) => {
    socketHandler.updateList(io, req, res);
});

app.post('/message', mw.loggedInCheck, (req,res) => {
    console.log(req.body.message);
});

app.use(require('./routers/routes'));


server.listen(8080, function() {
    console.log("I'm listening.");
});


/************* Socket Logic ***********/
io.on('connection', (socket) => {
    console.log(`socket with the id ${socket.id} is now connected`);

    //could be the same io.sockets.emit
    io.emit('welcome', 'hello from server');

    socket.on('disconnect', () => {
        console.log('socket', socket);
        console.log(`socket with the id ${socket.id} is now disconnected`);
        socketHandler.disconnectUser(socket.id, io);
    });

    socket.on('newChat', () => {
        console.log('new chat');
        socketHandler.newChat(io);
    });

    socket.on('newMessage', (message) => {
        socketHandler.newMessage(message, socket.id, io);
        //io.emit('incomingMessage', message);
    });
});

module.exports.app = app;
