const routes = require('express').Router();
const teamActivities = require('./teamRoutes');
const proveAssignments = require('./proveRoutes');

routes
    .use('/proveAssignments', proveAssignments)
    .use('/teamActivities', teamActivities)
    .get('/', (req, res, next) => {
        res.render('pages/index', {
            title: 'Welcome to my CSE341 repository',
            path: '/'
        });
    })
    .use((req, res, next) => {
        res.render('pages/404', {
            title: '404 - Page not found',
            path: req.url
        });
    })
module.exports = routes;