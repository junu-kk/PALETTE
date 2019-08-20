var express = require('express');
var router = express.Router();
var User = require('../models/User');
var path = require('path');
var crypto = require('crypto');
var multer = require('multer');
var GridFsStorage = require('multer-gridfs-storage');
require('../models/Upload');


//gfs에 db와 collection 할당은 일단 생략
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

    
    return res.render('mypage', {
      ct: {
        pic: user.pic
      }
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
