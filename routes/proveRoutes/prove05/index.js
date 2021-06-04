//question with the mongoose connection...how to export? or what
const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const User = require('./models/user');
const csrf = require('csurf');
const flash = require('connect-flash');
//const multer = require('multer');

//const User = require('../prove04/models/user');
router.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
router.use(bodyParser.urlencoded({ extended: false }));
//router.use('/favicon.ico', express.static('images/favicon.ico'));
const adminRoutes = require('./routes/admin');
//const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const csrfProtection = csrf();
//

// const fileStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'images');
//   },
//   filename: (req, file, cb) => {
//     cb(null, new Date().toISOString() + '-' + file.originalname);
//   }
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }

// }
router
  //.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'))
  //.use(express.static(path.join(__dirname, 'public', 'provePublic', 'prove03', 'public')))
  .use(express.static(path.join(__dirname, 'public',)))
  .use('/images', express.static(path.join(__dirname, 'images')))
  //.use('/favicon.ico', express.static('images/favicon.ico'))
  .use(csrfProtection)//here or main index.js?
  .use(flash())//here or main index.js?
// .use((req, res, next) => {
//   User.findById('609583ea3f161a723a332044')//("60947956b893eb8bf3e04661")
//     .then(user => {
//       req.user = user;
//       next();
//     })
//     .catch(err => console.log(err));
// })
router.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});
router.use((req, res, next) => {
  //throw new Error('Sync Dummy');
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)//('609583ea3f161a723a332044')//("60947956b893eb8bf3e04661")
    .then(user => {
      //throw new Error('Dummy!);
      if (!user) {
        return next();
      }
      req.user = user; //new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch(err => {
      //console.log(err))
      //next();
      //throw new Error(err);
      next(new Error(err));
    });
});
//router.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));
router.use('/admin', adminRoutes)
  .use(shopRoutes)
  .use(authRoutes)
router.get('/500', errorController.get500)
  .use(errorController.get404)
  .use((err, req, res, next) => {
    //res.status(error.httpStatusCode).render(...);
    //res.redirect('/500');
    res.status(500).render('pages/proveAssignments/prove05/500', {
      pageTitle: 'Error Occurred',
      path: '/500',
      isAuthenticated: req.session.isLoggedIn
    });
  });


/*router.get('/', (req, res, next) => {
    res.render('pages/proveAssignments/prove03/', {//shop
        title: 'Prove 03 page',
        pageTitle: 'Prove 03 page',
        path: '/prove03'
    });
});*/
/* how to export mongoose?
mongoose
  .connect('mongodb+srv://heatherS:rzdW8iGaPSvM35rv@cluster0.3uz0q.mongodb.net/shop?retryWrites=true&w=majority')
  .then(result => {
    User.findOne().then(user =>{
      if (!user){
        const user = new User({
          name: 'me',
          email: 'me@me.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
*/
module.exports = router;
