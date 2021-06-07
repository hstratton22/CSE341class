const express = require('express');
const router = express.Router();
var jsonEngine = require('../../../controllers/w08/pr08');
// router.get('/', (req, res, next) => {
// res.send('Inside get request')
// })
router.get('/', jsonEngine.processJson)
    .post('/', jsonEngine.getIndex)
module.exports = router;