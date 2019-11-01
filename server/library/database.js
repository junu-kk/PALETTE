//Code for connecting MongoDB
var mongoose = require('mongoose');


function connectDB() {
  var mongoURI = 'mongodb+srv://KangJunewoo:brian980115@cluster0-mh67x.mongodb.net/palette_test2?retryWrites=true&w=majority';
  
  mongoose.connect(mongoURI, function (err) {
    if (err) {
      console.error('DBERROR', err);
    } else {
      console.log('palette_test2 mongodb connected');
    }
  });

}

module.exports = connectDB;
