var mongoose = require('mongoose');

module.exports = function(){
  (function(){
    mongoose.connect('mongodb://localhost:27017/palette_test', function(err){
      if(err){
        console.error('DBERROR', err);
      } else{
        console.log('palette_test mongodb connected');
      }
    });
  })();
}