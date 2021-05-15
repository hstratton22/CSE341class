const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    //req.isLoggedin = true;
    console.log(req.get('Cookie'));
    const isLoggedIn = req
        .get('Cookie')
        .split(';')[0]
        .trim()
        .split('=')[1] === 'true';
    console.log(req.session.isLoggedIn);
    res.render('pages/proveAssignments/prove04/auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: isLoggedIn//false
    });
}
exports.postLogin = (req, res, next) => {
    //req.session.isLoggedIn = true;
    //res.setHeader('Set-Cookie', 'loggedIn=true; HttpOnly');
    //req.isLoggedIn = true;

    User.findById("609583ea3f161a723a332044")//('609b345ab2be0d2dab099330')
        .then(user => {
            req.session.isLoggedIn = true;
            req.session.user = user;
            req.session.save(err => {
                console.log(err);
                res.redirect('./');// (/)
            });
            //res.redirect('login');//proveAssignments/prove04/(/)
        })
        .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
        req.session.destroy(err => {
            console.log(err);
            res.redirect('./');// (/)proveAssignments/prove04
        });
    }

// const User = require('../models/user');

// exports.getLogin = (req, res, next) => {
//     //console.log(req.get('Cookie')//)
//     const isLoggedIn = req
//         .get('Cookie')
//         .split(';')[0]
//         .trim()
//         .split('=')[1] === 'true';
//     res.render('auth/login', {
//         path: '/login',
//         pageTitle: 'Login',
//         isAuthenticated: isLoggedIn//req.isLoggedIn//
//     });
// };
// exports.postLogin = (req, res, next) => {
//     //req.isLoggedin = true;
//     //res.setHeader('Set-Cookie', 'loggedIn=true; HttpOnly')
//     User.findById('609583ea3f161a723a332044')//("60947956b893eb8bf3e04661")
//         .then(user => {
//             req.session.isLoggedIn = true;
//             req.session.user = user;
//             req.session.save(err => {
//                 console.log(err);
//                 res.redirect('/');
//             });
//             })
//             //next();
//         .catch(err => console.log(err));
//     //res.redirect('/');
// };
// exports.postLogout = (req, res, next) => {
//     req.session.destroy(err => {
//         console.log(err);
//         res.redirect('/');
//     });
// }