var mongoose = require('mongoose');
//var Grid = require('gridfs-stream');

function connectDB() {
  var mongoURI = 'mongodb://localhost:27017/palette_test';
  /*
  mongoose.connect(mongoURI, function(err){
    if(err){
      console.error('DBERROR', err);
    } else{
      console.log('palette_test mongodb connected');
    }
  });
  */
  
  mongoose.connect(mongoURI, function (err) {
    if (err) {
      console.error('DBERROR', err);
    } else {
      console.log('palette_test mongodb connected');
    }
  });

}
/*
var mongoURI = 'mongodb://localhost:27017/palette_test';
const conn = mongoose.createConnection(mongoURI);
let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});
*/
module.exports = connectDB;
