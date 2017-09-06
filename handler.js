const dbQuery = require('./dbQuery');
const help = require('./helpers');

function handle(query, req, res) {
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

            console.log("HANDLER: registerUser session info", req.session.user);
            //then route to main page
            res.redirect('/');
        }).catch(e => {
            console.error(e);
            res.redirect('/Welcome');
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

            // console.log('HANDLER: login: userInfo:', userInfo);
            // console.log('HANDLER: login: password', userInfo.password);
            //check password

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
        }).catch(e => console.error(e.stack));

    }
}

function setUserData(req) {

    var userInfo = [req.body['first_name'], req.body['last_name'], req.body['email'], req.body['password']];

    return userInfo = help.validate(userInfo);
}

function validate(userInput) {
    //this makes sure that any blank strings get converted to null so that the database rejects any null but required fields
    return userInput.map(item => item == '' ? null : item);
}

module.exports.handle = handle;
