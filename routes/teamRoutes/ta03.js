//TA03 PLACEHOLDER
const express = require('express');
const router = express.Router();
const url = "https://byui-cse.github.io/cse341-course/lesson03/items.json";
const fetch = require('node-fetch');
//var jsonEngine = require('../../controllers/wk3');
let items = [];

//const callFetch = (url) => {
fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {
        //console.log(jsonObject);

        // const itms = jsonObject;
        // for (let i = 0; i < jsonObject.length; i++) {
        //console.log(jsonObject[i].name);
        console.log('jsonObject is real');
        // }

        items = jsonObject;
    })
    .catch(err => console.log(err));
    
//  };

router.get('/', (req, res, next) => {
    res.render('pages/teamActivities/ta03', {
        title: 'Team Activity 03',
        path: '/ta03',
        items: items// For pug, EJS 
        //activeTA03: true, // For HBS
        //contentCSS: true, // For HBS
    });
})
router.post('/', (req, res, next) => {
    const searchWord = req.body.input1;
    console.log(searchWord);
    const found = items.tags.filter(word => word === searchWord);
    console.log(found);

    res.render('./', {
        title: "filtered",
        path: '/ta03',
        items:found
    });
})

module.exports = router;