const multer = require('multer');
const uidSafe = require('uid-safe');
const path = require('path');

var diskStorage = multer.diskStorage({

    destination: function (req, file, callback) {
        console.log(file); //see all the stuff that the file contains
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function(uid) { //uid safe is passed the # of bytes you want the id to be and btw it is b64 encoded
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        filesize: 2097152
    }
});


module.exports.uploader = uploader;
