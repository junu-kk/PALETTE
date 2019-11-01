var express = require('express');
var router = express.Router();
var User = require('../newModels/User_new');

router.get('/', (req,res,next)=>{
  User.find({}).exec((err,users)=>{
    if(err) res.status(500).json(err);
    else res.status(200).json(users);
  });
});

//정보 어떻게 조회? id로?
router.get('/specific', (req,res,next)=>{
  User.findOne({email:req.user.email}, (err,user)=>{
    if(err) res.status(500).json({err:err});
    else res.status(200).json(user);
  });
});

module.exports = router;