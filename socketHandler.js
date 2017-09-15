const dbQuery = require('./dbQuery');
const urlPrepend = require('./config.json');


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

    dbQuery.getUsersByIds(userList).then((results) => {
        console.log('SOCKET HANDLER:', results.rows);
        var s3mappedUsers = results.rows.map(user => {
            user.profile_pic = urlPrepend.s3Url + user.profile_pic;
            return user;
        });
        res.json({
            success: 200,
            users: s3mappedUsers
        });
    }).catch(e => {
        console.log(e.stack);
        res.json({error: e});
    });

}



module.exports.updateList = updateList;
