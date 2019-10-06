//router of my page
//파일업로드 관련은 나중에 주석달자.
var express = require('express');
var router = express.Router();
var User = require('../models/User');
var multer = require('multer');
var upload= multer({dest:'./upload'});

/*
들어가야 할걸로는
pic, name, palette, schoolinfo, workexp, bio, interests, friends, accomplishments, posts, ext, addfriend
이중에 일단 user db에 있는건
pic, fname&lname, school, work_exp, bio,  s_i, excs
없는건
palette, friends, accomplishments, posts, addfriend
게시물과 친구기능은 일단 추후추가.
*/

//shows mypage
router.get('/', (req, res, next)=> {
  res.send(req.isAuthenticated);
  /*
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  */
  User.findOne({ email: req.user.email })
  .populate('school')
  .populate('excs')
  .exec((err, user)=> {
    if (err) throw err;
    res.send(user);
    /*
    return res.render('mypage',{ct:{
      user:user,
    }});
    */
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
    
    //res.redirect('/main');
  });
});

//deletes the profile picture
router.post('/delete/:id', (req,res,next)=>{
  /*
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  */

  User.findOne({email:req.user.email}).exec((err,user)=>{
    if(err) throw err;
    user.pic=null;
    user.saveUser((err)=>{
      if(err) throw err;
    });

  });
});

module.exports = router;
