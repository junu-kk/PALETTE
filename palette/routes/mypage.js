var express = require('express');
var router = express.Router();
var User = require('../models/User');
var path = require('path');
var crypto = require('crypto');
var multer = require('multer');
var GridFsStorage = require('multer-gridfs-storage');
require('../models/Upload');
var Grid = require('gridfs-stream');


var mongoose = require('mongoose');
var mongoURI = 'mongodb://localhost:27017/palette_test';
const conn = mongoose.createConnection(mongoURI);
let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

const storage = new GridFsStorage({
  url: 'mongodb://localhost:27017/palette_test',
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) return reject(err);
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads',
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });

router.get('/', function (req, res, next) {
  if (req.isUnauthenticated()) {
    return res.redirect('/login');
  }
  User.findOne({ email: req.user.email }).populate('pic').exec(function (err, user) {
    if (err) throw err;
    return res.render('mypage');
    
  });
});

//user를 찾고, 그 pic에 맞는 파일을 찾아 띄우는 라우터.
router.get('/hi', function (req, res, next) {
  
  User.findOne({ email: req.user.email }).populate('pic').exec(function (err, user) {
    if (err) throw err;
    
    gfs.files.findOne({_id:user.pic._id},(err,file)=>{
      if(err) throw err;
      
      const readstream=gfs.createReadStream(file.filename);
      readstream.pipe(res);
      
    });
  });
});

router.post('/upload', upload.single('file'), (req, res, next) => {
  User.findOne({ email: req.user.email }).exec(function (err, user) {
    if (err) throw err;

    user.pic = res.req.file.id;
    user.saveUser((err) => {
      if (err) throw err;
    });
    res.redirect('/main');
  });
});

module.exports = router;
