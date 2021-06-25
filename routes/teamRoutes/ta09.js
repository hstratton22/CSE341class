const express = require('express');
const router = express.Router();
router.get('/', (req, res, next) => {
    res.render('pages/teamActivities/ta09', {
        title: 'W09',
        path: '/ta09'
    })
});
module.exports = router;