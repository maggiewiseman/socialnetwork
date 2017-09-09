function registerLoginCheck(req, res, next) {

    if(req.session.user) {
        //logged in
        if(req.session.user.sigId) {
            //already signed petition
            res.redirect('/');
        } else {
            //logged in but haven't signed petition
            res.redirect('/welcome/');
        }
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
