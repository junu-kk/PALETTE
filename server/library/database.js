//Code for connecting MongoDB
var mongoose = require('mongoose');


function connectDB() {
  var mongoURI = 'mongodb+srv://KangJunewoo:brian980115@cluster0-mh67x.mongodb.net/palette_test?retryWrites=true&w=majority';
  
  mongoose.connect(mongoURI, function (err) {
    if (err) {
      console.error('DBERROR', err);
    } else {
      console.log('palette_test mongodb connected');
    }
  });

}
/*
이 코드는 파일업로드가 필요한 라우터에 적용함.
var Grid = require('gridfs-stream');

var mongoURI = 'mongodb://localhost:27017/palette_test';
const conn = mongoose.createConnection(mongoURI);
let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});
*/
module.exports = connectDB;
