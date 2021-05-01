//TA03 PLACEHOLDER
const express = require('express');
const router = express.Router();
/*
var jsonEngine = require('../../controller/w?);
*/
//https://byui-cse.github.io/cse341-course/lesson03/items.json
/*fetch('https://byui-cse.github.io/cse341-course/lesson03/items.json')
.then(res => res.json())
.then((out) => {
    console.log('Output: ', out);
}).catch(err => console.error(err));
?
*/

/*router.get('/', jsonEngine.processJson
    .post('/', (req, res, next) => {
        let searchedValue = req.body.search ?;
        let fileterData = global.jsonResponse ?;
        console.log(filteredData);
        res.render('pages/teamActivities/ta03', {
            title: 'JSON search',
            data: filterData,
            path: '/ta03', // For pug, EJS 
            searchedValue: searchedValue
        });
    })
*/
router.get('/', (req, res, next) => {
        res.render('pages/teamActivities/ta03', {
            title: 'Team Activity 03',
            path: '/ta03', // For pug, EJS 
            //activeTA03: true, // For HBS
            //contentCSS: true, // For HBS
        });
    });

module.exports = router;