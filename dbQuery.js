const spicedPg = require('spiced-pg');
var localUrl = '';



if(!process.env.DATABASE_URL) {
    const secrets = require('./secrets.json');
    localUrl = `postgres:${secrets.dbUser}:${secrets.pass}@localhost:5432/social`;
}
var dbUrl = process.env.DATABASE_URL || localUrl;

//db returns a promise and you will get back a result
const db = spicedPg(dbUrl);

function addUser(userInfo) {
    console.log('DBQUERY: in add user.');
    let queryStr = 'INSERT INTO users (first_name, last_name, email, password, profile_pic) VALUES ($1, $2, $3, $4, $5) RETURNING id';
    return db.query(queryStr, userInfo).then((result) => {
        return(result.rows);
    });
}

function addFriendship(data) {
    console.log('DBQUERY: in addFriendship.');
    let queryStr = 'INSERT INTO friendships (sender_id, receiver_id, status) VALUES ($1, $2, $3)';
    return db.query(queryStr, data).then((result) => {
        return(result.rows);
    });
}

/*
- data is an array with the current user id, the id of the friend who is on the receiving end of this request and the new status.
- it doesn't return anything that gets used.
*/
function updateFriendship(data) {
    console.log('DBQUERY: in updateFriendship.');
    let queryStr = 'UPDATE friendships SET sender_id = $1, receiver_id = $2, status = $3 WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 and receiver_id = $1) RETURNING status';
    return db.query(queryStr, data).then((result) => {
        return(result.rows);
    });
}

/*
- data is an array with sender_id as first param and receiver_id as second param
- returns a number that represents status
*/
function getFriendStatus(data) {
    console.log('DBQUERY: in getFriendStatus');
    let queryStr = 'SELECT status, sender_id FROM friendships WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1)';
    return db.query(queryStr, data).then((result) => {
        return(result.rows);
    });
}

//dbQuery to get password, first_name and last_name and id from users table using e-mail
function getUserInfo(email) {
    console.log('DBQUERY: in getUserInfo');
    let queryStr = 'SELECT id, first_name, last_name, password, bio, profile_pic FROM users WHERE email = $1';
    return db.query(queryStr, email);
}

function updateProfilePic(data) {
    console.log('DBQUERY: in getUserInfo');
    let queryStr = 'UPDATE users SET profile_pic = $2 WHERE id = $1';
    return db.query(queryStr, data);
}

function updateProfile(data) {
    console.log('DBQUERY: in updateProfile');
    let queryStr = 'UPDATE users SET first_name = $2, last_name = $3, bio = $4 WHERE id = $1';
    return db.query(queryStr, data);
}

function getUserById(id) {
    console.log('DBQUERY in getUser, user_id=', id);
    let queryStr ='SELECT first_name, last_name, profile_pic, bio FROM users WHERE id = $1';
    return db.query(queryStr, id);
}
// function addProfile(profileData) {
//     console.log('DBQUERY in addProfile, user_id = ', profileData);
//     let queryStr = 'INSERT INTO user_profiles (user_id, age, city, homepage) VALUES ((SELECT id from users WHERE id=$1), $2, $3, $4)';
//     return db.query(queryStr, profileData);
// }
//
// function getProfileId(user_id) {
//     console.log('DBQUERY in getProfileId, user_id=', user_id);
//     let queryStr ='SELECT id FROM user_profiles WHERE user_id = $1';
//     return db.query(queryStr, user_id);
// }
//

//
//
// function updateProfile(profileData) {
//     console.log('DBQUERY in updateProfile, profileData', profileData);
//     let queryStr = 'UPDATE user_profiles SET age = $2, city = $3, homepage = $4 WHERE user_id = $1';
//     return db.query(queryStr, profileData);
// }

module.exports.addUser = addUser;
module.exports.getUserInfo = getUserInfo;
module.exports.updateProfilePic = updateProfilePic;
module.exports.addFriendship = addFriendship;
module.exports.updateProfile = updateProfile;
module.exports.getUserById = getUserById;
module.exports.getFriendStatus = getFriendStatus;
module.exports.updateFriendship = updateFriendship;


/* Tests */

// addFriendship([1, 2, 1]).then((results) => {
//     console.log(results);
// }).catch(e => console.error(e));
// addUser(['Maggie', 'Wiseman', 'maggie', 'maggiepass']).then((results) => {
//     console.log('results', results);
// }).catch(e => console.error(e.stack));
