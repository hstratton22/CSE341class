//TA02 PLACEHOLDER
// Remember, you can make more of these placeholders yourself! 
const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
let users = [];
let message = '';

router.get('/', (req, res, next) => {

    res.render('pages/teamActivities/ta02', {
        title: 'Team Activity 02',
        path: '/ta02', // For pug, EJS 
        activeTA03: true, // For HBS
        contentCSS: true, // For HBS
        users: users,
        message: message
    });
});

router.post('/removeUser', (req, res, next) => {
    let removeName = req.body.removeName;
    let findName = users.findIndex(user => user.name === removeName);
    if (findName == -1) {
        message = "User not found."
    }
    else {
        let newUsers = users.filter(user => user.name != removeName);
        users = newUsers;
        message = '';


    }


    //console.log("newUsers: " + newUsers);
    res.redirect('./');//pages/teamActivities/ta02

});
router.post('/addUser', (req, res, next) => {///teamActivities//

    let addName = req.body.username;
    //let hasName = users.includes(addName);
    const findName = users.findIndex(user => user.name === addName);
    if (findName != -1) {
        message = "User exists. Choose another name.";
    }
    else {
        users.push({ name: addName });
        message = '';
    }
    res.redirect('./');//pages/teamActivities/ta02

});


module.exports = router;
/*
// TA02 Solution
// This is the solution for the routing side of TA02
const express = require('express');
const router = express.Router();

// For requirement 01 of TA02
const userArray = ['Jack', 'Jill', 'Brian'];

// For requirement 02 of TA02
router.post('/addUser', (req, res, next) => {
    const newUser = req.body.newUser;

    userArray.push(newUser);

    res.redirect('/ta02/');
});

// For requirement 03 of TA02
router.post('/removeUser', (req, res, next) => {
    const remUser = req.body.remUser;

    // Splice method removes from a const array
    const index = userArray.indexOf(remUser);
    if (index !== -1 ) {
        userArray.splice(index, 1);
    }

    res.redirect('/ta02/');
});

router.get('/',(req, res, next) => {
    res.render('pages/ta02', {
        title: 'Team Activity 02',
        users: userArray,
        path: '/ta02', // For pug, EJS
        activeTA03: true, // For HBS
        contentCSS: true, // For HBS
    });
});

module.exports = router;
©*/