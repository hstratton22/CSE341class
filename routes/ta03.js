//TA03 PLACEHOLDER
const express = require('express');
const router = express.Router();
//https://byui-cse.github.io/cse341-course/lesson03/items.json
/*fetch('https://byui-cse.github.io/cse341-course/lesson03/items.json')
.then(res => res.json())
.then((out) => {
    console.log('Output: ', out);
}).catch(err => console.error(err));
*/

router.get('/',(req, res, next) => {
    res.render('pages/ta03', { 
        title: 'Team Activity 03', 
        path: '/ta03', // For pug, EJS 
        activeTA03: true, // For HBS
        contentCSS: true, // For HBS
    });
});

module.exports = router;