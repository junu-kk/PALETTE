var mongoose = require('mongoose');

function connectDB(){
  var mongoURI = 'mongodb://localhost:27017/palette_test';
  mongoose.connect(mongoURI, function(err){
    if(err){
      console.error('DBERROR', err);
    } else{
      console.log('palette_test mongodb connected');
    }
  });
}

module.exports = connectDB;
