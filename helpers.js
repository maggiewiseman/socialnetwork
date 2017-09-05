const bcrypt = require('bcryptjs');

/*
@params params is an object that is the request body
*/
function validateUser(params) {
    console.log('HANDLER: validUser');

    var userInfo = [params['first_name'], params['last_name'], params['email'], params['password']];

    return userInfo.map(function(item) {
        return item == '' ? null : item;
    });
}

/*
@params = array of data from user or session
*/
function validate(userInput) {
    return userInput.map(item => item == '' ? null : item);
}

function hashPassword(plainTextPassword) {
    return new Promise(function(resolve, reject) {
        bcrypt.genSalt(function(err, salt) {
            if (err) {
                return reject(err);
            }
            bcrypt.hash(plainTextPassword, salt, function(err, hash) {
                if (err) {
                    return reject(err);
                }
                resolve(hash);
            });
        });
    });
}

function checkPassword(textEnteredInLoginForm, hashedPasswordFromDatabase) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(textEnteredInLoginForm, hashedPasswordFromDatabase, function(err, doesMatch) {
            if (err) {
                reject(err);
            } else {
                console.log('HANDLER CheckPassword: doesMatch:', doesMatch);
                resolve(doesMatch);
            }
        });
    });
}

module.exports.checkPassword = checkPassword;
module.exports.hashPassword = hashPassword;
module.exports.validateUser = validateUser;
module.exports.validate = validate;
