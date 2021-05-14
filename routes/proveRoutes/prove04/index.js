//question with the mongoose connection...how to export? or what
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const User = require('./models/user');

router.use(bodyParser.urlencoded({ extended: false }));
const adminRoutes = require('./routes/admin');
//const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

router
  //.use(express.static(path.join(__dirname, 'public', 'provePublic', 'prove03', 'public')))
  .use(express.static(path.join(__dirname, 'public',)))
  .use((req, res, next) => {
    User.findById('609583ea3f161a723a332044')//("60947956b893eb8bf3e04661")
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
  })
  .use('/admin', adminRoutes)
  .use(shopRoutes)
  .use(authRoutes)
  .use(errorController.get404);


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
