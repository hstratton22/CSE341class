/*******************************************************************************
 * Feel free to remove this comment block and all other comments after pulling. 
 * They're for information purposes only.
 * 
 * This layout is provided to you for an easy and quick setup to either pull
 * or use to correct yours after working at least 1 hour on Team Activity 02.
 * Throughout the course, we'll be using Express.js for our view engines.
 * However, feel free to use pug or handlebars ('with extension hbs'). You will
 * need to make sure you install them beforehand according to the reading from
 * Udemy course. 
 * IMPORTANT: Make sure to run "npm install" in your root before "npm start"
 *******************************************************************************/
//https://github.com/hstratton22/CSE341class
//  https://cse341class.herokuapp.com/
//submitted for WK5--don't touch yet.
// Our initial setup (package requires, port number setup)
require('dotenv').config({ encoding: 'UTF-8' })
require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes');
const PORT = process.env.PORT || 5000 // So we can run on heroku || (OR) localhost:5000
const User = require('./routes/proveRoutes/prove05/models/user');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
//const PRIVATE = require('./private');
const MongoDBStore = require('connect-mongodb-session')(session);
const corsOptions = {
  origin: "https://cse341class.herokuapp.com/",
  optionsSuccessStatus: 200
};
const MONGODB_URL = process.env.MONGODB_URL || PRIVATE.dbURL;//"mongodb+srv://heatherS:rzdW8iGaPSvM35rv@cluster0.3uz0q.mongodb.net/shop?retryWrites=true&w=majority";
//"mongodb+srv://userCSE341class:cDqVlnEHSQkuE4bZ@cluster0.3uz0q.mongodb.net/shop?retryWrites=true&w=majority";
//const MONGODB_URI = process.env.MONGODB_URI ||'mongodb+srv://heatherS:rzdW8iGaPSvM35rv@cluster0.3uz0q.mongodb.net/shop';//?retryWrites=true&w=majority';

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URL, 
  collection: 'sessions'
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))
app.use(
  session({
  secret: 'my secret', 
  resave:false, 
  saveUninitialized: false,
  store: store
  
 })
);
// app.use((req, res, next) => {
//   if (!req.session.user){
//     return next();
//   }
//   User.findById(req.session.user._id)//('609583ea3f161a723a332044')
//     .then(user => {
//       req.user = user;
//       next();
//     })
//     .catch(err => console.log(err));
// });
app.disable('x-powered-by');
app
   .set('views', path.join(__dirname, 'views'))
   .set('view engine', 'ejs')
  // .use((req, res, next) => {
  //   User.findById("609583ea3f161a723a332044")//('609b345ab2be0d2dab099330')////("60947956b893eb8bf3e04661")
  //     .then(user => {
  //       req.user = user;
  //       next();
  //     })
  //     .catch(err => console.log(err));
  // })
  .use(cors(corsOptions))
  .use('/', routes);

  const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    family: 4
};
//const MONGODB_URL = process.env.MONGODB_URL || //"mongodb+srv://heatherS:rzdW8iGaPSvM35rv@cluster0.3uz0q.mongodb.net/shop?retryWrites=true&w=majority";
//"mongodb+srv://userCSE341class:cDqVlnEHSQkuE4bZ@cluster0.3uz0q.mongodb.net/test?retryWrites=true&w=majority";

mongoose
  .connect(//other account('mongodb+srv://heatherS:rzdW8iGaPSvM35rv@cluster0.3uz0q.mongodb.net/shop?retryWrites=true&w=majority')
  MONGODB_URL, options
  )
  .then(result => {
    // User.findOne().then(user => {
    //   //console.log("inside find user");
    //   //console.log(user)
    //   if (!user) {
    //     const user = new User({
    //       name: 'me',//'userCSE341',//'me',
    //       email: 'me@me.com',//cse341@me.com',
    //       cart: {
    //         items: []
    //       }
    //     });
    //     user.save();
    //   }
    
    // });
    

    app.listen(PORT);
  })
  .catch(err => {
    console.log(err);
  });
  // .use('/', routes)
 // .listen(PORT, () => console.log(`Listening on ${ PORT }`));
/*
// Route setup. You can implement more in the future!
const ta01Routes = require('./routes/ta01');
const ta02Routes = require('./routes/ta02');
const ta03Routes = require('./routes/ta03'); 
const ta04Routes = require('./routes/ta04'); 
const prove01Routes = require('./routes/prove01');
*/

   // For view engine as Pug
   //.set('view engine', 'pug') // For view engine as PUG. 
   // For view engine as hbs (Handlebars)
   //.engine('hbs', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'})) // For handlebars
   //.set('view engine', 'hbs')
   //?may need again
   //.use(bodyParser({extended: false})) // For parsing the body of a POST
   
   /*
   .use('/ta01', ta01Routes)
   .use('/ta02', ta02Routes) 
   .use('/ta03', ta03Routes) 
   .use('/ta04', ta04Routes)
   .use('/prove01', prove01Routes)
   .get('/', (req, res, next) => {
     // This is the primary index, always handled last. 
     res.render('pages/index', {title: 'Welcome to my CSE341 repo', path: '/'});
    })
   .use((req, res, next) => {
     // 404 page
     res.render('pages/404', {title: '404 - Page Not Found', path: req.url})
   })*/
   
