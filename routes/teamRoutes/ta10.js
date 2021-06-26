const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();


// Path to your JSON file, although it can be hardcoded in this file.
const dummyData = require('../../data/ta10-data2.json');

router.use(bodyParser.json());

router.get('/fetchAll', (req, res, next) => {
    res.json(dummyData);
});

router.post('/insertName', (req, res, next) => {
    console.log("req.body inside /insertName", req.body);
    console.log("newName", req.body.newName);
    console.log("alias", req.body.alias);
    
    if (req.body.newName !== undefined) {
        const newName = req.body.newName;
        const alias = req.body.alias || "undefined";
        if (!dummyData.avengers.some(a => a.name === newName)) {
            dummyData.avengers.push({ name: newName, AKA: alias });
            res.sendStatus(200);
        }

    }
    else {
        res.sendStatus(400);
    }

});
router.get('/', (req, res, next) => {
    res.render('pages/teamActivities/ta10', {
        title: 'Team Activity 10',
        path: '/teamActivities/ta10',
    });
});
module.exports = router;