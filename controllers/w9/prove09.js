const fetch = require('node-fetch');

const model = require('../../model/pokeModel');
exports.getPokemon = (pageNum, callback) => {
    const offset = 10 * (pageNum - 1);
    model.getPokemon(offset, (data) => {
        callback(data);
    });
}
// let settings = { method: "GET" };
// const url ='https://pokeapi.co/api/v2/pokemon?offset=0&limit=10';

// const renderPage = (req, res, json) => {
//     let start = 0;
    

//     res.render('pages/proveAssignments/prove09'), {
//         title: 'W09 Prove',
//         path: 'prove09',
//         pokeIndex:  start
//     }
// }


// exports.getPokemon = (req, res, next) => {

// };
// exports.getDetails = (req, res, next) => {
//     fetch(url, settings)
//         .then(res => res.json())
//         .then(json => {
//             console.log("inside getPokemon");
//             renderPage(req, res, json)

//         })


// }
//     ;
// exports.postPokemon = (req, res, next) => {

// };