const express = require('express');
const mw = require('./middleware');
const handler = require('../handler').handle;
const csrf = require('csurf');
const path = require( 'path' );
const uploader = require('../fileUploadHandler').uploader;
const sendToAWS = require('../awsHandler').sendToAWS;

const csrfProtection = csrf({ cookie: true });
const router = express.Router();

//if they are logged in then check if signed
//if not signed go to /petition page
router.route('/')
    .get(function(req, res){
        if(req.session.user) {
            console.log('there is a session');
            //they are logged in.
            return res.sendFile( path.join( __dirname, '../index.html' ) );
        }
        //they are not loggin in, send to login page
        console.log('ROUTER /: redirecting to welcome');
        return res.redirect('/welcome/');
    });

router.route('/welcome')
    .get(function(req, res){
        if(req.session.user) {
            //user is logged in, redirect to requested page
            console.log('Welcome; req.session exists');
            return res.redirect('/');
        }
        //they are not logged in
        return res.sendFile( path.join( __dirname, '../index.html' ) );
    });

router.route('/register')
    .post((req, res) => {
        handler('registerUser', req, res);
    });

router.route('/login')
    .post((req, res) => {
        handler('login', req, res);
    });

router.route('/profilepic')
    .post(uploader.single('file'), sendToAWS, (req,res) => {
        console.log('ROUTE /upload');
        if(req.file) {
            console.log('ROUTE: file upload ');
            handler('uploadProfilePic', req, res);
        } else {
            console.log('ROUTE no file');
            res.json({
                error: true
            });
        }
    });

router.route('/update/profile')
    .post(mw.loggedInCheck, (req,res, next)=> {
        handler('updateProfile', req, res);
    });

router.route('/api/user/:id')
    .get((req,res) => {
        handler('getUserById', req, res);
    });

router.route('/user')
    .get((req, res) => {
        //Return session info
        console.log('ROUTER: /user');
        res.json({
            success: true,
            userInfo: {
                id: req.session.user.id,
                first_name: req.session.user.first_name,
                last_name: req.session.user.last_name,
                profile_pic: req.session.user.imgsrc || 'http://clipart-library.com/images/LcdjLAAri.png',
                bio: req.session.user.bio
            }
        });
    });

router.get('/logout', (req, res) => {
    req.session.user = null;
    res.redirect('/welcome/');
});

router.get('*', mw.loggedInCheck, function(req, res) {
    console.log('file not found');
    return res.sendFile( path.join( __dirname, '../index.html' ) );
});

// router.use((req,res) => {
//     console.error('File Not Found, 404');
//     res.status(404);
//     res.json({error: 404});
// });

module.exports = router;
