//router of my page

var express = require('express');
var router = express.Router();
var User = require('../models/User');
var multer = require('multer');
var upload= multer({dest:'./upload'});

//shows mypage
router.get('/', (req,res,next)=>{
  if(req.isUnauthenticated()){
    res.status(404).json({status:'not logged in'});
  } else{
    User.findOne({email:req.user.email},(err,user)=>{
      if(err) throw err;
      res.status(200).json(user);
    })
  }
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
    
    //res.redirect('/');
  });
});

//deletes the profile picture
router.post('/delete/:id', (req,res,next)=>{

  User.findOne({email:req.user.email}).exec((err,user)=>{
    if(err) throw err;
    user.pic='';
    user.saveUser((err)=>{
      if(err) throw err;
    });

  });
});

module.exports = router;
