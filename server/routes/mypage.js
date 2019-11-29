//router of my page
//파일업로드 관련은 나중에 주석달자.
var express = require('express');
var router = express.Router();
var User = require('../models/User');
var multer = require('multer');
var upload= multer({dest:'./upload'});


//shows mypage
router.get('/', (req, res, next)=> {
  if (req.isUnauthenticated()) {
    return res.redirect('/login');
  }
  User.findOne({ email: req.user.email })
  .populate('school')
  .populate('excs')
  .exec((err, user)=> {
    if (err) throw err;
    return res.render('mypage',{ct:{
      user:user,
    }});
    
  });
});

//uploads new profile picture
router.post('/upload', upload.single('file'), (req, res, next) => {
  let image='/image/'+req.file.filename;
  
  User.findOne({ email: req.user.email }).exec((err, user)=> {
    if (err) throw err;
    
    user.pic = image;
    user.saveUser((err) => {
      if (err) throw err;
    });
    
    res.redirect('/main');
  });
});


module.exports = router;
