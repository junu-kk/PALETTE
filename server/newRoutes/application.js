var express = require('express');
var router = express.Router();
var Application = require('../newModels/Application_new');

router.get('/', (req,res)=>{
  if(req.query.id){
    Application.findOne({_id:req.query.id}).exec((err,application)=>{
      if(err) res.status(500).json(err);
      else res.status(200).json(application);
    })
  } else{
    Application.find({}).exec((err,applications)=>{
      if(err) res.status(500).json(err);
      else res.status(200).json(applications);
    });
  }
});

router.post('/create', (req,res)=>{
  var newApplication = new Application();
  newApplication.form = req.body.form;
  newApplication.user = req.body.user;
  newApplication.competition = req.body.competition;
  newApplication.event = req.body.event;
  newApplication.club = req.body.club;

  newApplication.saveApplication((err)=>{
    if(err) res.status(500).json(err);
    else res.status(200).json({status:'application create complete'});
  });
});

router.post('/update', (req,res)=>{
  Application.findOneandUpdate({_id:req.query.id},{
    //쿼리를 어떻게 넘길건지 결정해야.
  }, (err, updatedApplication)=>{
    if(err) res.status(500).json(err);
    else{
      updatedApplication.saveApplication();
      res.status(200).json({status:'application update complete'});
    }
  });
});

router.post('/delete', (req,res)=>{
  Application.findOneAndDelete({_id:req.query.id},(err)=>{
    if(err) res.status(500).json(err);
    else res.status(200).json({status:'application delete complete'});
  });
});

module.exports = router;