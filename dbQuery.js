const spicedPg = require('spiced-pg');
var localUrl = '';

if(!process.env.DATABASE_URL) {
    const secrets = require('./secrets.json');
    localUrl = `postgres:${secrets.dbUser}:${secrets.pass}@localhost:5432/social`;
}
var dbUrl = process.env.DATABASE_URL || localUrl;

const db = spicedPg(dbUrl);
//db returns a promise and you will get back a result

function addUser(userInfo) {
    console.log('DBQUERY: in add user.');
    let queryStr = 'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id';
    return db.query(queryStr, userInfo).then((result) => {
        return(result.rows);
    });
}

//dbQuery to get password, first_name and last_name and id from users table using e-mail
function getUserInfo(email) {
    console.log('DBQUERY: in getUserInfo');
    let queryStr = 'SELECT id, first_name, last_name, password FROM users WHERE email = $1';
    return db.query(queryStr, email);
}

function addProfile(profileData) {
    console.log('DBQUERY in addProfile, user_id = ', profileData);
    let queryStr = 'INSERT INTO user_profiles (user_id, age, city, homepage) VALUES ((SELECT id from users WHERE id=$1), $2, $3, $4)';
    return db.query(queryStr, profileData);
}

function getProfileId(user_id) {
    console.log('DBQUERY in getProfileId, user_id=', user_id);
    let queryStr ='SELECT id FROM user_profiles WHERE user_id = $1';
    return db.query(queryStr, user_id);
}

function getProfileById(id) {
    console.log('DBQUERY in getProfile, user_id=', id);
    let queryStr ='SELECT users.email, user_profiles.age, user_profiles.city, user_profiles.homepage, user_profiles.id FROM users LEFT OUTER JOIN user_profiles ON users.id = user_profiles.user_id WHERE users.id = $1';
    return db.query(queryStr, id);
}

function updateUser(userData) {
    console.log('DBQUERY in updateProfile, userData = ', userData);
    let queryStr = 'UPDATE users SET first_name = $1, last_name = $2, email = $3 WHERE id = $4';
    return db.query(queryStr, userData);
}

function updateProfile(profileData) {
    console.log('DBQUERY in updateProfile, profileData', profileData);
    let queryStr = 'UPDATE user_profiles SET age = $2, city = $3, homepage = $4 WHERE user_id = $1';
    return db.query(queryStr, profileData);
}



module.exports.addUser = addUser;
module.exports.getUserInfo = getUserInfo;
module.exports.addProfile = addProfile;
module.exports.getProfileById = getProfileById;
module.exports.getProfileId = getProfileId;
module.exports.updateUser = updateUser;
module.exports.updateProfile = updateProfile;


/* Tests */
// addUser(['Maggie', 'Wiseman', 'maggie', 'maggiepass']).then((results) => {
//     console.log('results', results);
// }).catch(e => console.error(e.stack));

// getProfile([7]).then((results) => {
//     console.log('results', results);
// }).catch(e => console.error(e.stack));

// addProfile([1, 37, null, 'google.com']).then(() => {
//     console.log('added Profile');
// }).catch(e => console.error(e.stack));

// getSignersByCity(['LA']).then((results) => {
//     console.log('results');
// }).catch(e => console.error(e.stack));
// addProfile([1, 37, null, 'google.com']).then(() => {
//     console.log('added Profile');
// }).catch(e => console.error(e.stack));

// getSigId([1]).then((result) => {
//     console.log(result);
//     if(result.rowCount > 0) {
//         console.log('got something');
//     } else {
//         console.log('got nothing');
//     }
// }).catch(e => console.error(e.stack));  //got something
//
// getSigId([25]).then((result) => {
//     console.log(result);
//     if(result.rowCount > 0) {
//         console.log('got something');
//     } else {
//         console.log('got nothing');
//     }
// }).catch(e => console.error(e.stack));
// getUserInfo(['leo@gmail']).then((results) => {
//     console.log(results);
// }).catch(e => console.error(e.stack));

// getSigners().then(result => {
//     console.log(result);
// }).catch(e => console.error(e.stack));
//
// addSignature(['Lizzy Sig', 1]).then(() =>{
//     console.log('added signature');
//     return getSigners();
// }).then((result) => {
//     console.log(result);
// }).catch(e => console.error(e.stack));

// numSignatures().then(result => {
//     console.log(result);
// }).catch(e => console.error(e.stack));
//
// getSignature([1]).then(result => {
//     console.log(result);
// }).catch(e => console.error(e.stack));
//
// getSignature(1).then(result => {
//     console.log(result);
// }).catch(e => console.error(e.stack));
//
// getSignature(10).then(result => {
//     console.log(result);
// }).catch(e => console.error(e.stack));

/* Failing Tests */
// getSignature('maggie').then(result => {
//     console.log(result);
// }).catch(e => console.error(e.stack));

// addSignature(['Null Sig', 'Test', null]).then(() =>{
//     console.log('added signature');
//     return getSigners();
// }).then((result) => {
//     console.log(result);
// }).catch(e => console.error(e.stack));
