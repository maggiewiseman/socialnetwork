const fs = require('fs');

/********** Knox Shenanigans ****************/
const knox = require('knox');
let secrets;
if (process.env.NODE_ENV == 'production') {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require('./secrets'); // secrets.json is in .gitignore
}
const client = knox.createClient({
    key: secrets.AWS_KEY,
    secret: secrets.AWS_SECRET,
    bucket: 'maggiesgingersocialnetwork'
});


function sendToAWS(req, res, next) {
    //Make Request to aws using the client we just created:
    console.log('SEND TO AWS: ', req.file.filename, req.file.path);
    const s3Request = client.put(req.file.filename, {
        'Content-Type': req.file.mimetype,
        'Content-Length': req.file.size,
        'x-amz-acl': 'public-read'
    });

    //Make readstream
    const readStream = fs.createReadStream(req.file.path);
    readStream.pipe(s3Request);

    s3Request.on('response', s3Response => {

        const wasSuccessful = s3Response.statusCode == 200;
        console.log('wasSuccessful', wasSuccessful);
        if(wasSuccessful) {
            next();
            fs.unlink(req.file.path);
        } else {
            res.json({
                success: false
            });
        }
    });
}

module.exports.sendToAWS = sendToAWS;
