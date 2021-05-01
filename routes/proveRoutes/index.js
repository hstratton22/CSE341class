const proveRoutes = require('express').Router();

proveRoutes
    .use('/prove01', require('./prove01/prove01'))
    .use('/prove02', require('./prove02/'))//01
    .use('/prove03', require('./prove03/'))
    //.use('/03', require('/prove03/index'))
    .get('/,', (req, res, next) => {
        res.render('pages/proveAssignments/', {
            pageTitle: 'Prove Assignments',
            path: '/proveAssignments'
        });
    })
/* .use((req, res, next) => {
     res.render('pages/404', {
         title: '404 - Page not found',
         path: req.url
     });
 })*/
module.exports = proveRoutes;