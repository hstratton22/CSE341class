const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const router = express.Router();
const path = require('path');
router.use(bodyParser.urlencoded({ extended: false }));
const adminRoutes = require('./routes/admin');
//const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

router
    //.use(express.static(path.join(__dirname, 'public', 'provePublic', 'prove03', 'public')))
    .use(express.static(path.join(__dirname, 'public',)))
    .use('/admin', adminRoutes)
    .use(shopRoutes)
    .use(errorController.get404);

/*router.get('/', (req, res, next) => {
    res.render('pages/proveAssignments/prove03/', {//shop
        title: 'Prove 03 page',
        pageTitle: 'Prove 03 page',
        path: '/prove03'
    });
});*/
module.exports = router;
