const mw = require('./routers/middleware');


let socketList = [];
let users = [];

module.exports = function socketRouter(app, io) {
    app.get('/connected/:socketId', mw.loggedInCheck, (req,res) => {

        res.json({
            success: 200
        });
    });
}



function updateList (io, req){
    var socketExists = socketList.find(socketListItem => socketListItem.id == req.params.socketId);
    if(!socketExists && io) {
        console.log('io', io);
        socketList.push({
            socketId: req.params.socketId,
            userId: req.session.user.id
        });
        console.log(socketList);
    }

    //for each socket connection that is in the socket list, get the user ids
    users = socketList.map(socketListItem => socketListItem.userId);
    console.log('SOCKET HANDLER users list:', users);
    return users;
}

//module.exports.socketRouter = socketRouter;

//module.exports.usersList = usersList;
/** Tests **/
// socketList = [{socketId: 1, userId: 2}, {socketId: 3, userId: 4}];
// updateList({io: 'io'}, {session: {user: { id: 6}}, params: {socketId: 5}});
