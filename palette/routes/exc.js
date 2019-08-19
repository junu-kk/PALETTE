var express = require('express');
var router = express.Router();
var Exc = require('../models/Exc');
var Apcn = require('../models/Apcn');
var User = require('../models/User');


router.get('/', function(req, res, next) {
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  Exc.find({}).exec(function(err,exc){
    if(err) throw err;

    return res.render('exc', {ct:{
      exc:exc
    }});
  });
});

router.get('/:id',(req,res,next)=>{
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  console.log('works');
  Exc.findOne({_id:req.params.id}).exec(function(err,exc){
    if(err) throw err;
    return res.render('exc/show',{ct:{
      exc:exc
    }});
  });
});

router.get('/apcn/:id',(req,res,next)=>{
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  Exc.findOne({_id:req.params.id}).exec(function(err,exc){
    if(err) throw err;
    return res.render('exc/apcn',{ct:{
      exc:exc
    }});
  });
});

router.post('/:id',(req,res,next)=>{
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  Exc.findOne({_id:req.params.id}).exec(function(err,exc){
    if(err) throw err;

    if(exc.due<Date.now()){
      console.log('over due');
      return res.redirect('/main');
    }

    var newApcn = new Apcn();
    console.log(req.body.ans);

    for(i=0;i<req.body.ans.length;i++){
      newApcn.ans.push(req.body.ans[i]);
    }
    console.log(newApcn.ans);
    
    User.findOne({email:req.user.email}).exec(function(err2,user){
      if(err2) throw err2;

      newApcn.user=user._id;
      exc.apcns.push(newApcn._id);
      user.excs.push(exc._id);
      
      
      
      
      user.saveUser(function(err4){
        if(err4) throw err4;
      });
      exc.saveExc(function(err5){
        if(err5) throw err5;
      });
      newApcn.saveApcn(function(err3){
        if(err3) throw err3;
      });
      
    });
    
  });
  return res.redirect('/main');
});

module.exports = router;
