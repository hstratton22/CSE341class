const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false}));

router.get('/', (req, res, next) => {
    res.render('pages/proveAssignments/prove02', {
        title: 'Prove 02 page', 
        path: '/prove02'
    });
});
module.exports = router;
