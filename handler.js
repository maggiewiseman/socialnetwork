const dbQuery = require('./dbQuery');
const help = require('./helpers');
const urlPrepend = require('./config.json');

const PENDING = 1, ACCEPTED = 2, REJECTED = 3, CANCELLED = 4, TERMINATED = 5;

var statusMap = {
    pending: 1,
    accepted: 2,
    rejected: 3,
    cancelled: 4,
    terminated: 5
};

function handle(query, req, res) {
    if (query == 'updateFriendship') {
        console.log('HANDLE ${query}');
        //find out if relationship already exists
        return dbQuery.getFriendStatus([req.session.user.id, req.params.id]).then((results)=>{
            if(results.rows[0].status) {
                //relationship exists so update relationship
                updateFriendship(req, res, results.rows[0].status);
            } else {
                //relationship does not exist add a new one.
                let data = [req.session.user.id, req.body.otherUserId, statusMap.pending];
                dbQuery.addFriendship(data).then(()=> {
                    res.json({
                        friendshipStatus: 'pending'
                    });
                }).catch((e) => {
                    console.error(e.stack);
                    res.json({
                        error: e
                    });
                });
            }
        });

    }

    if (query == 'getFriendStatus') {
        return dbQuery.getFriendStatus([req.session.user.id, req.params.id]).then((results) => {

            let friendshipStatus = 'Make';

            if(results[0].status){
                console.log('there is a relationship');
                //there is a friendship
                //do the logic to determine what status should be sent to the button
                friendshipStatus = determineReturnStatus(req.session.user.id, results[0].status);
            }
            console.log('GetFriend Status:', friendshipStatus);
            res.json({friendshipStatus});

        }).catch(e => {
            console.error(e.stack);
            res.json({
                error: e
            });
        });
    }

    if (query == 'getOtherUserById') {
        console.log(`HANDLE ${query}`, req.body);
        let data = [req.params.id];
        dbQuery.getUserById(data).then((results) => {
            console.log('results:', results.rows);
            results.rows[0].profile_pic = urlPrepend.s3Url + results.rows[0].profile_pic;
            res.json({
                userInfo: results.rows[0]
            });
        });
    }
    // if (query == 'getOtherUserById') {
    //     console.log(`HANDLE ${query}`, req.body);
    //     let data = [req.params.id];
    //     let userInfo = {};
    //     //get user profile data
    //     return dbQuery.getUserById(data).then((results) => {
    //         console.log('results:', results.rows);
    //         results.rows[0].profile_pic = urlPrepend.s3Url + results.rows[0].profile_pic;
    //         userInfo = results.rows[0];
    //         //figure out if there is a current relationship
    //         return dbQuery.getFriendStatus([req.session.user.id, req.params.id]);
    //     }).then((results) => {
    //         console.log(results.rows);
    //         if(results.rows){
    //             //do the logic to determine what status should be sent to the button
    //             userInfo.friendshipStatus = determineReturnStatus(req.session.user.id, results.rows[0]);
    //         } else {
    //             //there is no friendship
    //             userInfo.friendshipStatus = 'Make';
    //         }
    //         console.log('HANDLER getOtherUserById: userINfo:', userInfo);
    //         res.json(userInfo);
    //     }).catch(e => {
    //         console.error(e.stack);
    //         res.json({
    //             error: e
    //         });
    //     });
    // }

    if (query == 'getUserById') {
        console.log(`HANDLE ${query}`, req.body);
        let data = [req.session.user.id];
        dbQuery.getUserById(data).then((results) => {
            console.log('results:', results.rows);
            results.rows[0].profile_pic = urlPrepend.s3Url + results.rows[0].profile_pic;
            res.json({
                userInfo: results.rows[0]
            });
        });
    }

    if (query == 'updateProfile') {
        //set data that is given
        console.log(`HANDLE ${query}`, req.body);
        let data = [req.session.user.id, req.body.first_name, req.body.last_name, req.body.bio];

        req.session.user.first_name = req.body.first_name;
        req.session.user.last_name = req.body.last_name;
        req.session.user.bio = req.body.bio;

        dbQuery.updateProfile(data).then(()=> {
            res.json({
                success: true
            });
        }).catch((e) => {
            console.error(e.stack);
            res.json({
                error:e
            });
        })

    }
    if(query == 'uploadProfilePic') {
        let data = [req.session.user.id, req.file.filename];
        console.log(`HANDLE: ${query} data:`, data);
        return dbQuery.updateProfilePic(data).then((results) => {
            console.log(`HANDLE: ${query} update successful sending response`);
            req.session.user.profile_pic = urlPrepend.s3Url + req.file.filename
            res.json({
                success: true,
                profile_pic: urlPrepend.s3Url + req.file.filename
            });
        }).catch((e) => {
            res.json({
                error: e
            });
        });
    }

    if(query == 'registerUser') {
        return new Promise((resolve, reject) => {
            if(!(req.body.first_name && req.body.last_name && req.body.email && req.body.password)){
                reject('All fields are required when registering');
            } else {
                resolve();
            }
        }).then(() => {
            var validUserInfo = setUserData(req);
            //need to hash the signature
            return help.hashPassword(validUserInfo[3]).then((hash) =>{
                validUserInfo[3] = hash;
                //then we need to query the database to add signature with an array that has first_name, last_name, email, hashed password
                return dbQuery.addUser(validUserInfo);
            });
        }).then((id) =>{
            //when that comes back successfully with an id, we need to set session.user with first name, last name and user_id
            console.log('HANDLER: add user id', id);
            req.session.user = {
                id: id[0].id,
                first_name: req.body.first_name,
                last_name: req.body.last_name
            };

            console.log('HANDLER: registerUser session info', req.session.user);
            //then route to main page
            res.json({
                success: true
            });
        }).catch(e => {
            console.log('caught an error');
            console.error(e);
            res.json({
                error: e
            });
        });
    }

    var userInfo;
    if(query == 'login') {
        return dbQuery.getUserInfo([req.body.email]).then((returnedUserInfo)=>{
            //show me stuff that came back
            //console.log('HANDLER login returnedUserINfo ', returnedUserInfo);

            if(returnedUserInfo.rowCount == 0) {
                console.error('User does not exist');
                throw new Error ('User does not exist');
            }

            userInfo = returnedUserInfo.rows[0];

            return help.checkPassword(req.body.password, userInfo.password);
        }).then((validPass)=>{

            if(!validPass) {
                console.log('HANDLER login: invalid password');
                res.json({
                    error: 'invalid password'
                });
            } else {
                req.session.user = {
                    id: userInfo.id,
                    first_name: userInfo.first_name,
                    last_name: userInfo.last_name
                };
                console.log('HANDLER: set req.session.user info');
                res.json({
                    success: true
                });
            }
        }).catch((e) => {
            res.json({
                error: 'Something went wrong. Please try again.'
            });
            console.error(e.stack);
        });

    }
}

function setUserData(req) {
    let profile_pic  = '8U6SwVSYYaNTC-TAKzw2g5pYI3Strfph.png';
    let userInfo = [req.body['first_name'], req.body['last_name'], req.body['email'], req.body['password'], profile_pic];

    return userInfo = help.validate(userInfo);
}

function validate(userInput) {
    //this makes sure that any blank strings get converted to null so that the database rejects any null but required fields
    return userInput.map(item => item == '' ? null : item);
}



module.exports.handle = handle;

/*
- dbResults is an object that contains status and sender_id
- returns the status that should be displayed by the button
*/
function determineReturnStatus(user_id, dbResults) {

    var { status, sender_id } = dbResults;

    if(status == ACCEPTED) {
        //user and sender are friends, so option is to terminate relationship
        return 'End';
    } else if (status == PENDING) {
        //one of them sent a friend request
        if(user_id == sender_id) {
            //if the user is the sender, then they should see Pending
            //if the user was not the one who sent the request, they should see Accept
            return 'Pending';
        } else {
            return 'Accept';
        }
    } else {
        //If status is cancelled, rejected, or terminated the users should have the option to make a friend request again.
        return 'Make';
    }
}


/*
- dbResults is an object that contains status and sender_id
- returns the status that should be displayed by the button
*/
function updateFriendship(req, res, status) {
    console.log('status is: ', status);
    let data = [req.session.user.id, req.params.id];
    //if it says accepted than it is being changed to terminated
    if(status == ACCEPTED) {
        console.log('Accepted to terminated');
        data.push(TERMINATED);
    } else if (status == PENDING) {
        //Just got status from db.  If it is pending there's two possible responses
        //1) reject in this case there will be params in the body that say reject
        //2) accept, no status in body
        if(req.body) {
            console.log('Pending to reject');
            data.push(REJECTED);
        } else {
            console.log('Pending to accept');
            data.push(ACCEPTED);
        }
    } else {
        //if it says terminated, cancelled, or rejected we are changing it to pending and updating the user ids
        console.log('terminated, cancelled or rejected to Pending');
        data.push(PENDING);
    }

    dbQuery.updateFriendship(data).then((results) => {
        console.log('HANDLER updateFriendship results: ', results[0].status);

        //Turn the status back into a word that React can use to render the correct button
        let friendshipStatus = determineReturnStatus(req.session.user.id, {status: results[0].status, sender_id: req.session.user.id});

        console.log(friendshipStatus);
        res.json({
            friendshipStatus: friendshipStatus
        });
    }).catch(e => {
        console.error(e.stack);
        res.json({
            error: e
        });
    });
}

//Tests
//for this one, comment out the res.json sections
//updateFriendship({session: {user: {id: 1}}, params: {id: 2}}, {}, 1);

//handle('getFriendStatus', {session: {user: {id: 1}}, params: {id: 2}}, {});
