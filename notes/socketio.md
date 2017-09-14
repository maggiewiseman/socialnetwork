# Socket.io

* protocol for client server communication (http, ftp, ws...)
* inspect WS in chrom dev tools (Web Sockets)
* http connection between client and server. This is like a handshake and then they agree and switch to sockets.
* WS and WSS (secure web sockets)
* once socket is established there is a persistent connection and that means that when something changes the server can just send a message.

* unlike our normal http where events happen b/c of http "events", there aren't events.  If you wanted a 'continuous connection' you could use polling.  So the client will nag the server for updates on a regular schedule, but instead we can use sockets.
    * if you aren't careful this can result in you DOS'ing yourself
* socket.io is a library for doing web socket stuff. It comes with a client side library and a server side library that you use in Node.
* socket.io set up in the real world setup is super challenging if you have multiple servers and/or clusters...
* socket.io needs a pure node http server. So we're going to require the node http server and then pass our express app to it.
    * do we have two servers running? No. There's only one port, it is just that the shape of the javascript object is slightly different.

```javascript
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.get('/', function(req, res) { // just a normal route
    res.sendStatus(200);
});

server.listen(8080); // it's server, not app, that does the listening
```
* so once we have done this we are not ready to start listening for socket connections.
* the io object that we created is our main interface to socket functionality. It translates web traffic into an event. It is entirely event based so we handle event.
* listen for a connection event and the event handler will be handled a socket and the socket will be an object that will have a unique id.
* when the socket disconnects, there is a disconnect event that fires

## Client Side
* import io
* var socket = io.connect() makes the connection with the server. This causes the connect event to trigger on the server.

* socketio falls back to polling when the server is not responding.


* are there any security issues? There used to be, but it seems all worked out.
* no cookies
* ajax request to get session-id, and confirm that sockets is one of the connected sockets.

socket.on('connection', function(socket) {
        ajax('/somePath', socket.id);
    })

* how to send a message....
```javascript
io.on('connection', function(socket) {
    console.log(`socket with the id ${socket.id} is now connected`);

    socket.on('disconnect', function() {
        console.log(`socket with the id ${socket.id} is now disconnected`);
    });

    socket.on('thanks', function(data) { //the server will have sent something like: socket.emit('thanks', message)
        console.log(data);
    });

    socket.emit('welcome', { //server will have an event listener called socket.on('welcome')
        message: 'Welome. It is nice to see you'
    });
});

//on the server:
io.sockets.emit('achtung'), {
    warning: 'This warning will go to all sockets that are listening'
}

//to target a specific user
io.sockets.sockets[recipientSocketId].emit('request', {
    message: 'You have a new friend request!'
});

```
