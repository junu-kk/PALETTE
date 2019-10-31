/*
dob
address
bio
grade
class
work_exp
fun_facts
school
*/

//router for first logged-in user
var express = require('express');
var router = express.Router();
var User = require('../models/User');

router.post('/', (req,res,next)=>{
  if(req.isUnauthenticated()){
    res.status(401).json({status:'not logged in'});
  } else{
    User.findOneAndUpdate({email:req.user.email}, {
      dob:req.body.dob,
      address:req.body.address,
      bio:req.body.bio,
      grade:req.body.grade,
      class:req.body.class,
      work_exp:req.body.work_exp,
      fun_facts:req.body.fun_facts,
    }, (err,updateUser)=>{
      if(err) throw err;
      updateUser.saveUser();
    });
  }  
});


module.exports = router;