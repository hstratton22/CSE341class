const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false}));

router.get('/', (req, res, next) => {
    res.render('pages/proveAssignments/prove03/', {//shop
        title: 'Prove 03 page', 
        pageTitle: 'Prove 03 page',
        path: '/prove03'
    });
});
module.exports = router;
