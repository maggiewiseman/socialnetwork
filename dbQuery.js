var spicedPg = require('spiced-pg');
var localUrl = '';

const PENDING = 1, ACCEPTED = 2, REJECTED = 3, CANCELLED = 4, TERMINATED = 5;

if(!process.env.DATABASE_URL) {
    const secrets = require('./secrets.json');
    localUrl = `postgres:${secrets.dbUser}:${secrets.pass}@localhost:5432/social`;
}
var dbUrl = process.env.DATABASE_URL || localUrl;

//db returns a promise and you will get back a result
var db = spicedPg(dbUrl);

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


/*
Look at friendships table, get all the rows where the status is pending and the sender_id is the user. Then find out the reciever_id for that row and go get the user information that matches it.
Also get the rows where the status is accepted and the user is either the sender or the reciever. For those rows, get the opposite users information.
*/
function getFriends(data) {
    console.log('DBQUERY: in getFriendStatus');
    let queryStr = `SELECT users.first_name, users.last_name, users.id, users.profile_pic, users.bio, friendships.status
    FROM friendships INNER JOIN users
    ON (friendships.status = ${PENDING} AND receiver_id = $1 AND sender_id = users.id)
    OR (friendships.status = ${ACCEPTED} AND sender_id = $1 AND receiver_id = users.id)
    OR (friendships.status = ${ACCEPTED} AND receiver_id = $1 AND sender_id = users.id)`;
    return db.query(queryStr, data).then((result) => {
        return(result.rows);
    });
}

//dbQuery to get profile information: first_name and last_name and id from users table using e-mail
function getOtherUserByName(name) {
    console.log('DBQUERY: in getUserInfo', name);
    let queryStr = 'SELECT id, first_name, last_name, bio, profile_pic FROM users WHERE (first_name = $1) OR (last_name = $1)';
    return db.query(queryStr, name);
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

function getUsersByIds(ids) {
    console.log('DBQUERY: in getUsersByIds: ', ids);
    let queryStr = 'SELECT id, first_name, last_name, profile_pic, bio FROM users WHERE id = ANY($1)';
    return db.query(queryStr, [ids]);
}

function getMessages() {
    console.log('DBQUERY: in getMessages ');
    let queryStr = 'SELECT chats.message, chats.user_id, chats.id, chats.created_at AS date, users.first_name, users.last_name, users.profile_pic FROM chats JOIN users ON chats.user_id = users.id ORDER BY chats.created_at DESC LIMIT 10';
    return db.query(queryStr);
}

function getMessageById(chatId) {
    console.log('DBQUERY in getMessage by Id');
    let queryStr = 'SELECT chats.message, chats.user_id, chats.id, chats.created_at AS date, users.first_name, users.last_name, users.profile_pic FROM chats JOIN users ON (chats.user_id = users.id AND chats.id = $1)';
    return db.query(queryStr, chatId);
}
function addMessage(data) {
    console.log('DBQUERY: in add Message.');
    let queryStr = 'INSERT INTO chats (user_id, message) VALUES ($1, $2) RETURNING id';
    return db.query(queryStr, data);
}

function getMatches(data) {
    console.log('DBQUERY: in getMatches', data);
    let queryStr = 'SELECT id, first_name, last_name FROM users WHERE (email LIKE LOWER($1)) OR (first_name LIKE LOWER($1)) OR (LOWER(last_name) LIKE LOWER($1))';
    return db.query(queryStr, data);
}

function addPost(data) {
    console.log('DBQUERY: in getMatches', data);
    let queryStr = 'INSERT INTO posts (user_id, creator_id, user_text, image, link, link_text) VALUES ($1, $2, $3, $4, $5, $6)';
    return db.query(queryStr, data);
}

function getPosts(data) {
    console.log('DBQuery: in getPosts', data);
    
}

module.exports.addUser = addUser;
module.exports.getMatches = getMatches;
module.exports.addMessage = addMessage;
module.exports.getMessages = getMessages;
module.exports.getMessageById = getMessageById;
module.exports.getUserInfo = getUserInfo;
module.exports.updateProfilePic = updateProfilePic;
module.exports.addFriendship = addFriendship;
module.exports.updateProfile = updateProfile;
module.exports.getUserById = getUserById;
module.exports.getFriendStatus = getFriendStatus;
module.exports.getFriends = getFriends;
module.exports.updateFriendship = updateFriendship;
module.exports.getOtherUserByName = getOtherUserByName;
module.exports.getUsersByIds = getUsersByIds;

/* Tests */
//getMessages().then((results)=> console.log(results.rows)).catch(e => console.error(e));
// getUsersByIds([6,6,3]).then((results) => {
//     console.log(results.rows);
// });
// getOtherUserByName(['Dogg']).then((results) => {
//     console.log(results);
// }).catch(e => console.error(e));
// getFriends([4]).then((results) => {
//     console.log(results);
// }).catch(e => console.error(e));
//getFriendStatus([1, 2]);
//  addFriendship([1, 2, 1]).then((results) => {
//     console.log(results);
// }).catch(e => console.error(e));
// addUser(['Maggie', 'Wiseman', 'maggie', 'maggiepass']).then((results) => {
//     console.log('results', results);
// }).catch(e => console.error(e.stack));
