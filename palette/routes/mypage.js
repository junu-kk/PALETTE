var express = require('express');
var router = express.Router();
var User = require('../models/User');
var path = require('path');
var crypto = require('crypto');
var multer = require('multer');
var GridFsStorage = require('multer-gridfs-storage');
var Grid = require('gridfs-stream');
var methodOverride = require('method-override');



let gfs;



router.get('/', function(req, res, next) {
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  User.findOne({email:req.user.email}).exec(function(err,user){
    if(err) throw err;

    return res.render('mypage',{ct:{
      file:user.pic
    }});
  });
});

router.post('/upload', (req,res,next)=>{

});

module.exports = router;
