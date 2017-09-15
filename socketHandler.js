
let socketList = []
function updateList (io, req, res){
    var socketExists = socketList.find(socketListItem => socketListItem.id == req.params.socketId);
    if(!socketExists && io.sockets.sockets[req.params.socketsId]) {
        socketList.push({
            socketId: req.params.socketsId,
            userId: req.session.user.id
        });
    }

}



module.exports.updateList = updateList;
