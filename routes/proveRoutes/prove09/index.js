const express = require('express');
const bodyParser = require('body-parser');
const pokeRoutes = require('../../../controllers/w9/prove09');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
// .use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');//lockdown to specific domains
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//     res.setHeader('Acces-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });

router.get('/', (req, res, next) => {
    res.render('pages/proveAssignments/prove09/')
})//pokeRoutes.getDetails)
    .get('/pokemon/:page', (req, res, next) => {
        const page = req.params.page;
        pokeRoutes.getPokemon(page, (pokemon) => {
            res.render('pages/proveAssignments/prove09/pokemon', {
                pokemonList: pokemon, page
            });
        });
    })
module.exports = router;