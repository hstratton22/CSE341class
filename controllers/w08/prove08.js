//last page not displaying correctly
//actual last page not displaying?
//correct number items displaying- possibly all related
const fetch = require('node-fetch');
const ITEMS_PER_PAGE = 10;
const bodyParser = require('body-parser');
let items = [];
//let foundDisplay = [];
const url = "https://byui-cse.github.io/cse341-course/lesson03/items.json";
let settings = { method: "GET" };
// let totalItems = 0;
//let searchWord;

const renderPage = (req, res, json) => {
    searchWord = req.body.searchValue || req.query.searchValue || '';//
    let page = +req.query.page || 1;
    console.log("searchWord", searchWord, "page", page);
    let foundDisplay = [];
    let totalItems = 0;

    const start = (page - 1) * ITEMS_PER_PAGE // Item index to start on...
    const end = ITEMS_PER_PAGE//page * 
    console.log('start', start, "end", end);
    if (searchWord == '' || typeof searchWord === 'undefined' ) {
        console.log(' empty string  or type is undefined')
        return res.render('pages/teamActivities/ta08', {
            title: 'WK 08 ',
            path: '/ta08',
            searchedValue: searchWord,
            //page: page,
            items: items.splice(start, end),//foundDisplay.splice(start, end),
            currentPage: page,
            hasNextPage: ITEMS_PER_PAGE * page < totalItems,// || null,
            hasPreviousPage: page > 1 || null,
            nextPage: page + 1 || null,
            previousPage: page - 1 || null,
            lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE) || null 
        });
    }
    if (searchWord !== null ) {//|| searchWord !== '')
        //if !(typeof searchWord === 'undefined') {
        let searchString = searchWord.toString();
        //console.log(searchString);
        let lowerSearch = searchString.toLowerCase();
        //console.log(lowerSearch);
        let upperSearch = lowerSearch[0].toUpperCase() + lowerSearch.substring(1);
        //console.log(upperSearch);
        //console.log(items[0]);
        let found = items.filter((word) =>
            word.tags.includes(upperSearch));
            console.log("found length", found.length);
        totalItems = found.length;
        
        found.forEach(item => {
            foundDisplay.push(item);
        })
        
    }
    //}

    res.render('pages/teamActivities/ta08', {
        title: 'WK 08 Results',
        path: '/ta08',
        items: foundDisplay.splice(start, end),
        searchedValue: searchWord,
        //page: page,
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
    });

}
exports.callJSON = (req, res, next) => {
    fetch(url, settings)
        .then(function (response) {console.log('inside callJSON')
            return response.json();
        })
        .then(function (jsonObject) {
            //console.log('jsonObject is real');
            items = jsonObject;
            totalItems= items.length;
            console.log("items length", items.length)
            renderPage(req, res, items)
        })
        .catch(err => console.log(err));


}
exports.getPage = (req, res, next) => {
    renderPage(req, res, items)
}

