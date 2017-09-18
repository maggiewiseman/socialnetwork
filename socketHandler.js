const dbQuery = require('./dbQuery');
const urlPrepend = require('./config.json');


let socketList = []
function updateList (io, req, res){
    console.log(req.params.socketId);
    var socketExists = socketList.find(socketListItem => socketListItem.id == req.params.socketId);

    //if socket does not yet exist and is a valid one, add to socket list.
    if(!socketExists && io.sockets.sockets[req.params.socketId]) {
        socketList.push({
            socketId: req.params.socketId,
            userId: req.session.user.id
        });
    }

    console.log(socketList);

    //get User list
    makeUserList().then((results) => {
        console.log('SOCKET HANDLER:', results.rows);
        var s3mappedUsers = prependUrl(results.rows);
        // var s3mappedUsers = results.rows.map(user => {
        //     user.profile_pic = urlPrepend.s3Url + user.profile_pic;
        //     return user;
        // });
        io.emit('userConnected', s3mappedUsers);
        res.json({
            success: 200,
            users: s3mappedUsers
        });
    }).catch(e => {
        console.log(e.stack);
        res.json({error: e});
    });

}


/* this function is going to take the socket.id and go through my lists object to get userId of disconnected Users.  And it is going to remove that particular item from the list.  And then it is going to see if user is in there more than one time.  If user is in there more than one time, it will do nothing else.  If the user is not in the list then it will update the users list and emit an userDisconnected event with a new usersList.

*/
function disconnectUser(socketId, io) {
    console.log('SOCKET HANDLER: disconnect socketId:', socketId);

    var index = socketList.findIndex(item => item.socketId == socketId);
    var userId = socketList[index].userId;

    socketList.splice(index, 1);
    console.log('Spliced Socket List: ', socketList);

    var userStillInList = socketList.findIndex(item => item.userId == userId);

    if(userStillInList < 0) {
        makeUserList().then((results) => {
            //emit an event
            console.log('SOCKET HANDLER: disconnect user', results.rows);
            var users = prependUrl(results.rows);
            // var users = results.rows.map(user => {
            //     user.profile_pic = urlPrepend.s3Url + user.profile_pic;
            //     return user;
            // });
            io.emit('disconnectedUser', users);

        });
    }

}

function makeUserList() {
    var userList = socketList.map(socketListItem => socketListItem.userId);
    console.log('SocketHandler: userList: ', userList);

    return dbQuery.getUsersByIds(userList);
}

/* This function is called when a new chat event is received. It gets the latest 10 messages from the db and sends them back to the user */
function newChat(io) {
    console.log('SOCKET HANDLER: newChat');
    return dbQuery.getMessages().then(results => {

        console.log('SOCKET HANDLER: back from getting messages',results.rows);
        var messages = prependUrl(results.rows);
        io.emit('chatMessages', messages);
    });
}
/*
This function is going to take in a message, the req, and the io.
It is going to add the message to the database and then it is going to emit and event that says there's a new message.
On the client side my socket will be listening for new message and will update accordingly. */
function newMessage(message, socketId, io) {
    var userId = getUserIdFromSocket(socketId);

    var data = [userId, message];

    console.log('SOCKET HANDLER: newMessage', data);
    return dbQuery.addMessage(data).then((messageId) => {
        console.log(messageId.rows[0].id);
        return dbQuery.getMessageById([messageId.rows[0].id]);

    }).then(results => {
        console.log('About to emit message', results.rows);
        io.emit('incomingMessage', results.rows);
    }).catch(e => {
        console.error(e.stack);
    });
}

function getUserIdFromSocket(socketId) {
    var index = socketList.findIndex(item => item.socketId == socketId);
    return socketList[index].userId;
}

function prependUrl(list) {
    var newList = list.map(user => {
        user.profile_pic = urlPrepend.s3Url + user.profile_pic;
        return user;
    });
    return newList;
}

module.exports.newChat = newChat;
module.exports.newMessage = newMessage;
module.exports.disconnectUser = disconnectUser;
module.exports.updateList = updateList;
