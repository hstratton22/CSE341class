//only use with mongodb not mongoose
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db;

const mongoConnect = (callback) => {
  MongoClient.connect('mongodb+srv://userCSE341class:cDqVlnEHSQkuE4bZ@cluster0.3uz0q.mongodb.net/shop?retryWrites=true&w=majority')

  //MongoClient.connect('mongodb+srv://heatherS:rzdW8iGaPSvM35rv@cluster0.3uz0q.mongodb.net/shop?retryWrites=true&w=majority')
    .then(client => {
      console.log('Connected');
      _db = client.db();
      callback(client);
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
}
exports.mongoConnect= mongoConnect;
exports.getDb = getDb;