const express = require('express');
const mw = require('./middleware');
const handler = require('../handler').handle;
const csrf = require('csurf');
const path = require( 'path' );

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
    //.all(csrfProtection)

    // .get(mw.registerLoginCheck, (req, res) => {
    //     res.render('register', {csrfToken: req.csrfToken()});
    // })

    .post((req, res) => {
        handler('registerUser', req, res);
    });

router.route('/login')
    //.all(csrfProtection)
    // .get(mw.registerLoginCheck, (req, res) => {
    //     res.render('login', {csrfToken: req.csrfToken()});
    // })

    .post((req, res) => {
        handler('login', req, res);
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
                imgsrc: req.session.user.imgsrc || 'http://clipart-library.com/images/LcdjLAAri.png',
                bio: req.session.user.bio || 'No bio'
            }
        });
    });

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            console.error(err);
        } else {
            console.log('ROUTER: user logged out');
        }
    });
    res.redirect('/login');
});


router.use((req,res) => {
    console.error('File Not Found, 404');
    res.status(404);
    res.json({error: 404});
});

module.exports = router;
