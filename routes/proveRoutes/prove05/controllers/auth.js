const crypto = require('crypto');

const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const { validationResult } = require('express-validator');// /check
//const PRIVATE = require('../../../../private');
const User = require('../models/user');
const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: process.env.API_KEY || PRIVATE.API_KEY
    }
}))
    ;

exports.getLogin = (req, res, next) => {
    //req.isLoggedin = true;
    // console.log(req.get('Cookie'));
    // const isLoggedIn = req
    //     .get('Cookie')
    //     .split(';')[0]
    //     .trim()
    //     .split('=')[1] === 'true';
    // console.log(req.session.isLoggedIn);
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('pages/proveAssignments/prove05/auth/login', {
        path: '/login',
        pageTitle: 'Login',
        errorMessage: message,
        oldInput: {
            email: '',
            password: ''
        },
        validationErrors: []
        //isAuthenticated: false//isLoggedIn//false
    });
}
exports.getSignup = (req, res, next) => {
    //console.log(req.flash('error'));
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('pages/proveAssignments/prove05/auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        errorMessage: message,
        oldInput: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationErrors: []
        //isAuthenticated: false
    });
};

exports.postLogin = (req, res, next) => {
    //req.session.isLoggedIn = true;
    //res.setHeader('Set-Cookie', 'loggedIn=true; HttpOnly');
    //req.isLoggedIn = true;
    const email = req.body.email;
    const password = req.body.password;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).render('pages/proveAssignments/prove05/auth/login', {
            path: '/login',
            pageTitle: 'Login',
            errorMessage: errors.array()[0].msg,
            oldInput: {
                email: email,
                password: password
            },
            validationErrors: errors.array()
        });
    }

    //User.findById("609583ea3f161a723a332044")//('609b345ab2be0d2dab099330')
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                //req.flash('error', 'Invalid email or password')
                //return res.redirect('login');// (/)
                return res.status(422).render('pages/proveAssignments/prove05/auth/login', {
                    path: '/login',
                    pageTitle: 'Login',
                    errorMessage: 'Invalid email or password.',
                    oldInput: {
                        email: email,
                        password: password
                    },
                    validationErrors: []//[{param: 'email', param: 'password'}]
                });
            }
            bcrypt
                .compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save(err => {
                            console.log(err);
                            res.redirect('./');// (/)
                        });
                    }
                    //req.flash('error', 'Invalid email or password')
                    //res.redirect('login');// /
                    return res.status(422).render('pages/proveAssignments/prove05/auth/login', {
                        path: '/login',
                        pageTitle: 'Login',
                        errorMessage: 'Invalid email or password.',
                        oldInput: {
                            email: email,
                            password: password
                        },
                        validationErrors: []//[{param: 'email', param: 'password'}]
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('/login');
                });
        })
        //next();
        .catch(err => //console.log(err)
        {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });

};

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('./');// (/)proveAssignments/prove04
    });
}
exports.postSignup = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    console.log(name);
    //const confirmPassword = req.body.confirmPassword;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(422).render('pages/proveAssignments/prove05/auth/signup', {
            path: '/signup',
            pageTitle: 'Signup',
            errorMessage: errors.array()[0].msg,
            oldInput: {
                name: name,
                email: email,
                password: password,
                confirmPassword: req.body.confirmPassword
            },
            validationErrors: errors.array()
        });
    }
    // User.findOne({ email: email })
    //     .then(userDoc => {
    //         if (userDoc) {
    //             req.flash('error', 'Email already exists. Pick a different one.')
    //             return res.redirect('signup');// /
    //         }
    //         return 
    bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
            const user = new User({
                name: name,
                email: email,
                password: hashedPassword,
                cart: { items: [] }
            });
            return user.save();
        })
        .then(result => {
            res.redirect('login');// /
            // return transporter.sendMail({
            //     to: email,
            //     from: 'str19023@byui.edu',
            //     subject: 'Signup succeeded',
            //     html: '<h1>You successfully signed up!</h1>'
            // });
        })
        .catch(err => {
            //console.log(err);
            {
                const error = new Error(err);
                error.httpStatusCode = 500;
                return next(error);
            }
        });
};
exports.getReset = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('pages/proveAssignments/prove05/auth/reset', {
        path: '/reset',
        pageTitle: 'Reset Password',
        errorMessage: message
    });
}
exports.postReset = (req, res, next) => {
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err);
            return res.redirect('/reset');
        }
        const token = buffer.toString('hex');
        User.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    req.flash('error', 'No account with that email found.');
                    return res.redirect('/reset');
                }
                user.resetToken = token;
                user.resetTokenExpiration = Date.now() + 3600000;
                return user.save();
            })
            .then(result => {
                res.redirect('/');
                transporter.sendMail({
                    to: req.body.email,
                    from: 'str19023@byui.edu',
                    subject: 'Password Reset',
                    html: `<p>You requested a password reset</p>
            <p>Click this <a href=
            "http://localhost:5000/reset/${token}">link</a> to set a new password.</p>
            `
                    //change this address to what?
                });

            })
            .catch(err => { //console.log(err); 
                const error = new Error(err);
                error.httpStatusCode = 500;
                return next(error);
            });
    });
}
exports.getNewPassword = (req, res, next) => {
    const token = req.params.token;
    User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
        .then(
            user => {
                let message = req.flash('error');
                if (message.length > 0) {
                    message = message[0];
                } else {
                    message = null;
                }
                res.render('pages/proveAssignments/prove05/auth/new-password', {
                    path: '/new-password',
                    pageTitle: 'New Password',
                    errorMessage: message,
                    userId: user._id.toString(),
                    passwordToken: token
                });
            }
        )
        .catch(err => {
            //console.log(err);
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};
exports.postNewPassword = (req, res, next) => {
    const newPassword = req.body.password;
    const userId = req.body.userId;
    const passwordToken = req.body.passwordToken;
    let resetUser;

    User.findOne({
        resetToken: passwordToken,
        resetTokenExpiration: { $gt: Date.now() },
        _id: userId
    })
        .then(user => {
            resetUser = user;
            return bcrypt.hash(newPassword, 12);
        })
        .then(hashedPassword => {
            resetUser.password = hashedPassword;
            resetUser.resetToken = undefined;
            resetUser.resetTokenExpiration = undefined;
            return resetUser.save();

        }).then(result => {
            res.redirect('/login');
        })
        .catch(err => {
            //console.log(err);
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
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