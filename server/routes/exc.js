//router for extracurricular activities
var express = require('express');
var router = express.Router();
var Exc = require('../models/Exc');
var Apcn = require('../models/Apcn');
var User = require('../models/User');


//show list of extracurricular activities
router.get('/', (req, res, next)=> {
  if(req.isUnauthenticated()){
    res.status(401).json({status:'not logged in'});
  } else{
    Exc.find({}).exec((err,excs)=>{
      if(err) throw err;
      res.status(200).json(excs);
    });
  }
});

//show information of an extracurricular activity
router.get('/:id',(req,res,next)=>{
  if(req.isUnauthenticated()){
    res.status(404).json({status:"not logged in"});
  } else{
    Exc.findOne({_id:req.params.id})
    .exec((err,exc)=>{
      if(err) throw err;
      res.status(200).json(exc);
      
    });
  }
});

//procedure for registering extracurricular activity
router.post('/:id',(req,res,next)=>{
  if(req.isUnauthenticated()){
    res.status(404).json({status:"not logged in"});
  }

  Exc.findOne({_id:req.params.id}).exec((err,exc)=>{
    if(err) throw err;

    if(exc.due<Date.now()){
      res.status(404).json({status:"over due"});
    } else{
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
    }
  });
});

module.exports = router;
