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

/*
들어가야 할걸로는
pic, name, palette, schoolinfo, workexp, bio, interests, friends, accomplishments, posts, ext, addfriend
이중에 일단 user db에 있는건
pic, fname&lname, school, work_exp, bio,  s_i, excs
없는건
palette, friends, accomplishments, posts, addfriend
게시물과 친구기능은 일단 추후추가.
팔레트기능은.. 7개가 뭔지 일단 준서한테 물어보자. 역시 추후추가.
*/


router.get('/', function (req, res, next) {
  if (req.isUnauthenticated()) {
    return res.redirect('/login');
  }
  User.findOne({ email: req.user.email })
  .populate('school')
  .populate('excs')
  .exec(function (err, user) {
    if (err) throw err;
    return res.render('mypage',{ct:{
      user:user,
    }});
    
  });
});

//user를 찾고, 그 pic에 맞는 파일을 찾아 띄우는 라우터.
router.get('/hi', function (req, res, next) {
  
  User.findOne({ email: req.user.email }).populate('pic').exec(function (err, user) {
    if (err) throw err;
    
    if(user.pic==null){
      return;
    }
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

router.post('/delete/:id', (req,res,next)=>{
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }

  User.findOne({email:req.user.email}).exec((err,user)=>{
    if(err) throw err;
    user.pic=null;
    user.saveUser((err)=>{
      if(err) throw err;
    });
    gfs.remove({_id:req.params.id,root:'uploads'},(err,gridStore)=>{
      if(err) return res.status(404).json({err:err});

      res.redirect('/mypage');
    });

  });
});

module.exports = router;
