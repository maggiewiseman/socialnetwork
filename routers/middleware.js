function registerLoginCheck(req, res, next) {

    if(req.session.user) {
        //logged in
        res.redirect('/');
    } else {
        //not logged in go to registration page
        next();
    }
}
function loggedInCheck(req, res, next) {
    if(req.session.user) {
        next();
    } else {
        res.redirect('/welcome/');
    }
}

module.exports.loggedInCheck = loggedInCheck;
module.exports.registerLoginCheck = registerLoginCheck;
