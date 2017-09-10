const dbQuery = require('./dbQuery');
const help = require('./helpers');
const urlPrepend = require('./config.json');

function handle(query, req, res) {
    if (query == 'getOtherUserById') {
        console.log(`HANDLE ${query}`, req.body);
        var data = [req.params.id]
        dbQuery.getUserById(data).then((results) => {
            console.log('results:', results.rows);
            results.rows[0].profile_pic = urlPrepend.s3Url + results.rows[0].profile_pic;
            res.json({
                userInfo: results.rows[0]
            });
        });
    }

    if (query == 'getUserById') {
        console.log(`HANDLE ${query}`, req.body);
        var data = [req.session.user.id];
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
        var data = [req.session.user.id, req.body.first_name, req.body.last_name, req.body.bio];

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
        var data = [req.session.user.id, req.file.filename];
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
    var userInfo = [req.body['first_name'], req.body['last_name'], req.body['email'], req.body['password'], profile_pic];

    return userInfo = help.validate(userInfo);
}

function validate(userInput) {
    //this makes sure that any blank strings get converted to null so that the database rejects any null but required fields
    return userInput.map(item => item == '' ? null : item);
}



module.exports.handle = handle;
