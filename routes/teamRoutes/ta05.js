/**********************************
 * Team Activity 05 route handling
 **********************************/
 const express = require('express');
 const router = express.Router();
 
 const ta05Controller = require('../../controllers/ta05');
 
 // You can use GET with dynamic routes as well, 
 // but POST is typically used to modify properties on the server
 router.post('/create-cookie', ta05Controller.postCreateCookie);
 
 router.post('/change-style', ta05Controller.postStyle);
 
 router.post('/counter', ta05Controller.postCounter);
 
 router.post('/reset', ta05Controller.resetSession);
 
 router.get('/', ta05Controller.getIndex);
 
 module.exports = router;
 



/*const express = require('express');
//const session = require('express-session');
const bodyParser = require('body-parser');
const session = require('express-session');
const router = express.Router();
//const mongoose = require('mongoose');
//const session = require('express-session');
//router.use(session({secret: 'ta05'resave: false,
// saveUninitialized: false}));
//var ssn;
//let style = null;

router.get('/', (req, res, next) => {
    //ssn= req.session;
    //ssn.style;
    //ssn.counter;
    req.session.style = 'red';
    req.session.counter;

    res.render('pages/teamActivities/ta05', {
        title: 'Team Activity 05',
        path: '/ta05',
        style: req.session.style// For pug, EJS 
        //activeTA04: true, // For HBS
        //contentCSS: true, // For HBS
    });
});
router.post('/change-style', (req, res, next) => {
    console.log("inside change-style");
    //req.session.style= 'green';
    console.log(req.session);
    if (req.session.style) {
        console.log(req.session.style);
        style = "red";
        //document.body.style.backgroundColor = req.session.style;
    } else {
        //document.body.style.backgroundColor = "blue";
        //req.session.style= 'blue';
    }
    res.redirect('./');

});
router.post('/counter', (req, res, next) => {
    // if (req.session.counter) {
    //     req.session.counter = req.session.counter + 1;
    // } else {
    //     req.session.counter = 1;
    // }
    // if (req.body.countUp) {
    //     req.session.counter = req.session.counter + 1;
    // } else if (req.body.countDown) {
    //     req.session.counter = req.session.counter - 1;
    // } else {
    //     req.session.counter = 1;
    // }
    if (req.session.counter) {
        if (req.body.countUp) {
            req.session.counter = req.session.counter + 1;
        } else if (req.body.countDown) {
            req.session.counter = req.session.counter - 1;
        }
        // else {
        //     req.session.counter = 1;
        // }
    }
    else {
        req.session.counter = 1;
    }
    res.redirect('./');

});
router.post('/reset', (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('./');// /
    });
})

module.exports = router;
*/