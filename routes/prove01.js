const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false}));

router.get('/', (req, res, next) => {
    res.render('pages/form', {
        title: 'First page', 
        path: '/form'
    });
});

router.post('/out', (req, res, next) => {
    const input1 = req.body.input1;
    const input2 = req.body.input2;
    const input3 = req.body.input3;
    res.render('pages/output', {
        title: "Responses", 
        path: '/output',
        input1: input1,
        input2: input2,
        input3: input3
    });
    
});

module.exports = router;
