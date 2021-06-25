const fetch = require('node-fetch');
exports.getPokemon = (offset, callback) => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`)
    .then(res => res.json())
    .then(data => {
        callback(data.results);
    });
}