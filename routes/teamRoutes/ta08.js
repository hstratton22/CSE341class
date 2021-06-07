//TA08 PLACEHOLDER
const express = require('express');
const router = express.Router();
const url = "https://byui-cse.github.io/cse341-course/lesson03/items.json";
const fetch = require('node-fetch');
let settings = {method: "GET"};
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
let items = [];
const ITEMS_PER_PAGE = 10;

fetch(url, settings)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {
        //console.log('jsonObject is real');
        items = jsonObject;
    })
    .catch(err => console.log(err));


router.get('/', (req, res, next) => {
    res.render('pages/teamActivities/ta08', {
        title: 'Prove 08',
        path: '/ta08',
        items: [],//items,
        currentPage: null,//page,
        hasNextPage: null,//ITEMS_PER_PAGE * page < totalItems,
        hasPreviousPage: null, //page > 1,
        nextPage: null, //page + 1,
        previousPage: null, //page - 1,
        lastPage: null//Math.ceil(totalItems / ITEMS_PER_PAGE)
    });
})
router.post('/search', (req, res, next) => {
    const searchWord = req.body.input1;
    //console.log(searchWord);
    let searchString = searchWord.toString();
    //console.log(searchString);
    let lowerSearch = searchString.toLowerCase();
    //console.log(lowerSearch);
    let upperSearch = lowerSearch[0].toUpperCase() + lowerSearch.substring(1);
    //console.log(upperSearch);
    //console.log(items[0]);
    let found = items.filter((word) =>
        word.tags.includes(upperSearch));
    const page = +req.query.page || 1;
    let totalItems = found.length;
    //return totalItems;
//how to implement skip and limit here? 
    // found.find()
    //     .countDocuments()
    //     .then(numProducts => {
    //         totalItems = numProducts;
    //         return found.find()
                // .skip((page - 1) * ITEMS_PER_PAGE)
                // .limit(ITEMS_PER_PAGE)
        // })
               
            res.render('pages/teamActivities/ta08', {
                title: 'Prove 08 Results',
                path: '/ta08',
                items: found,
                currentPage: page,
                hasNextPage: ITEMS_PER_PAGE * page < totalItems,
                hasPreviousPage: page > 1,
                nextPage: page + 1,
                previousPage: page - 1,
                lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
            });
        })
    // .catch(err => {
    //     console.log(err)
    // });
//})

module.exports = router;