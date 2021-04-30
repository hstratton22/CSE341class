const routes = require('express').Router();

routes
    .use('/ta01', require('./ta01'))
    .use('/ta02', require('./ta02'))
    .use('/ta03', require('./ta03'))
    .use('/ta04', require('./ta04'))
    .get('/', (req, res, next) => {
        res.render('pages/teamActivities/', {
            pageTitle: 'Team Activities',
            path: '/teamActivities'
        });
    })
/* .use((req, res, next) => {
     res.render('pages/404', {
         title: '404 - Page not found',
         path: req.url
     });
 })*/
module.exports = routes;