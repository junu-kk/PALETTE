//router for extracurricular activities
var express = require('express');
var router = express.Router();
var Exc = require('../models/Exc');
var Apcn = require('../models/Apcn');
var User = require('../models/User');

//show list of extracurricular activities
router.get('/', (req, res, next)=> {
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  Exc.find({}).exec((err,excs)=>{
  if(err) throw err;

  return res.render('exc/new', {ct:{
      excs:excs
    }, active: ['exc', 'search_exc']});
});
});

//show information of an extracurricular activity
router.get('/:id',(req,res,next)=>{
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  Exc.findOne({_id:req.params.id}).exec((err,exc)=>{
    if(err) throw err;
    console.log(exc);
    return res.render('exc/newshow',{ct:{
      exc:exc
    }, active: ['exc']});
  });
});

//shows application form for
//registering the extracurricular activity
router.get('/apcn/:id',(req,res,next)=>{
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  Exc.findOne({_id:req.params.id}).exec((err,exc)=>{
    if(err) throw err;
    return res.render('exc/apcn',{ct:{
      exc:exc
    }});
  });
});

//procedure for registering extracurricular activity
router.post('/:id',(req,res,next)=>{
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  Exc.findOne({_id:req.params.id}).exec((err,exc)=>{
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
    
    User.findOne({email:req.user.email}).exec((err,user)=>{
      if(err) throw err;

      newApcn.user=user._id;
      newApcn.exc=exc._id;
      exc.apcns.push(newApcn._id);
      user.excs.push(exc._id);
      
      
      
      
      user.saveUser((err)=>{
        if(err) throw err;
      });
      exc.saveExc((err)=>{
        if(err) throw err;
      });
      newApcn.saveApcn((err)=>{
        if(err) throw err;
      });
      
    });
    
  });
  return res.redirect('/main');
});

module.exports = router;
