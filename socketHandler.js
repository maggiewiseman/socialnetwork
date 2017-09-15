const dbQuery = require('./dbQuery');


let socketList = []
function updateList (io, req, res){
    console.log(req.params.socketId);
    var socketExists = socketList.find(socketListItem => socketListItem.id == req.params.socketId);
    if(!socketExists && io.sockets.sockets[req.params.socketId]) {
        socketList.push({
            socketId: req.params.socketId,
            userId: req.session.user.id
        });
    }

    console.log(socketList);

    //get User list
    var userList = socketList.map(socketListItem => socketListItem.userId);
    console.log('SocketHandler: userList: ', userList);

    dbQuery.getUsersByIds(userList).then(() => {
        res.json({
            success: 200
        })
    }).catch(e => {
        console.log(e.stack);
        res.json({error: e});
    });

}



module.exports.updateList = updateList;
